package ma.dnaengineering.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Configuration pour /processFile
                registry.addMapping("/processFile")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("POST")
                        .allowCredentials(true);

                // Configuration pour /employees/** (y compris /employees/${selectedFileName})
                registry.addMapping("/employees/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET")  // Ajoutez les méthodes nécessaires
                        .allowCredentials(true);
            }
        };
    }
}
