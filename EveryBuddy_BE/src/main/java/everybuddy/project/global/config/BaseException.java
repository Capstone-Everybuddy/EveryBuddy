package everybuddy.project.global.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import everybuddy.project.global.config.BaseResponseStatus;

@Getter
@Setter
@AllArgsConstructor
public class BaseException extends Exception {
    private BaseResponseStatus status;  //BaseResoinseStatus 객체에 매핑
}
