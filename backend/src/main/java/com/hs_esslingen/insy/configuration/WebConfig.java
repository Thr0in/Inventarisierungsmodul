package com.hs_esslingen.insy.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Class for configuring CORS (Cross-Origin Resource Sharing)
// Sets the allowed origins, methods and headers for CORS requests
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private Environment environment;

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(environment.getProperty("allowed.origin")) // Frontend-Origin
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                .allowedHeaders("*");
        // .allowCredentials(true);
    }
}
