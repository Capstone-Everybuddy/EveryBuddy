package everybuddy.project.domain.ocr;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
@RestController
@RequestMapping("")
public class OcrController {
    private final String CLOVA_API_URL = "https://npzkkvvfw2.apigw.ntruss.com/custom/v1/31293/271189c4820c85b4b1724a25d9b557fab9c28f6d18a649b62258ad3608cd5c0d/infer";
    private final String CLOVA_API_CLIENT_SECRET = "QmN1eWh6ZFlMdE10QVFHcVljZHhLQW5TSFV2VHVEZGU=";

    @PostMapping("/api/ocr")
    public ResponseEntity<String> proxyToClovaAPI(@RequestParam("file") MultipartFile file) throws IOException {
        byte[] imageBytes = file.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        // JSON 객체 생성
        Map<String, Object> requestPayload = new HashMap<>();
        requestPayload.put("version", "V1");
        requestPayload.put("requestId", UUID.randomUUID().toString());
        requestPayload.put("timestamp", System.currentTimeMillis());

        Map<String, Object> image = new HashMap<>();
        image.put("format", "jpg");
        image.put("name", "test_image");
        image.put("data", base64Image);
        image.put("templateIds", new String[]{"29937"});

        requestPayload.put("images", new Map[]{image});

        // JSON 직렬화
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonPayload = objectMapper.writeValueAsString(requestPayload);

        // 클로바 API 호출을 위한 헤더 추가
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-OCR-SECRET", CLOVA_API_CLIENT_SECRET);
        headers.set("Content-Type", "application/json");

        // 클로바 API에 전송할 요청 생성
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        // 클로바 API로 요청 전송
        ResponseEntity<String> response = restTemplate.exchange(
                CLOVA_API_URL,
                HttpMethod.POST,
                request,
                String.class
        );

        return ResponseEntity.ok(response.getBody());
    }
}
