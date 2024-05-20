package everybuddy.project.domain.chatting.controller;

import everybuddy.project.domain.chatting.entitiy.ChatRoom;
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

    // 채팅 화면
    @GetMapping("/room")
    @Operation(summary = "채팅방 화면 API", description = "채팅방을 화면 API")
    public String rooms(Model model) {
        return "templates/room";
    }

    @GetMapping("/rooms")
    @Operation(summary = "모든 채팅방 조회 API", description = "모든 채팅방을 조회하는 API")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatService.findAllRoom();
    }

    @PostMapping("/room")
    @Operation(summary = "채팅방 생성 API", description = "채팅방을 생성하는 API")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String name) {
        return chatService.createRoom(name);
    }
    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    @GetMapping("/room/{roomId}")
    @Operation(summary = "채팅방 조회 API", description = "채팅방을 조회하는 API")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findById(roomId);
    }
}
