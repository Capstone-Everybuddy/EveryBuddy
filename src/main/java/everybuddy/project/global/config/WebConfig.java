package everybuddy.project.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import com.deepit.stock.filter.JwtAuthorizationFilter;
//import com.deepit.stock.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {
    //private final JwtTokenProvider jwtTokenProvider;
    //@Value("${jwt.filter.enable:false}")
    //private boolean jwtFilterEnable;
//    @Bean
//    public FilterRegistrationBean<JwtAuthorizationFilter> jwtAuthorizationfilter() {
//        FilterRegistrationBean<JwtAuthorizationFilter> filterBean = new FilterRegistrationBean<>();
//        filterBean.setFilter(new JwtAuthorizationFilter(jwtTokenProvider, jwtFilterEnable));
//        filterBean.addUrlPatterns("/*");
//        filterBean.setOrder(0);
//        return filterBean;
//    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(false).maxAge(6000);
    }
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(false);
        config.addAllowedOrigin("http://localhost:3001");
        config.addAllowedOrigin("https://frontend-pi-lovat.vercel.app");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setMaxAge(6000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(new CorsFilter(source));
        filterBean.setOrder(0);
        return filterBean;
    }
}