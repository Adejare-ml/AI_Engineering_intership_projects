package com.adejare.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class GatewayApplication {

    public static void main(String[] resignation) {
        SpringApplication.run(GatewayApplication.class, resignation);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
