package everybuddy.project.domain.chatting.controller;

import everybuddy.project.domain.chatting.entity.ChatRoom;
import everybuddy.project.domain.chatting.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatService chatService;

    // 채팅 리스트 화면 html
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }

    // 유저 아이디에 해당하는 채팅방 아이디 반환
    @GetMapping("/roomId/{userId}/{userType}")
    @ResponseBody
    public int getRoomId(@PathVariable("userId") int userId, @PathVariable("userType") String userType) { return chatService.getRoomId(userId, userType); };

//    // 모든 채팅방 목록 반환
//    @GetMapping("/rooms/{userId}")
//    @ResponseBody
//    public List<ChatRoom> room(@PathVariable("userId") int userId) {
//        return chatService.findAllRoom(userId);
//    }

    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String name) {
        return chatService.createRoom(name);
    }

    // 채팅방 입장 화면 html
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findById(roomId);
    }
}
