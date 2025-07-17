package com.hs_esslingen.insy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hs_esslingen.insy.dto.StatisticDTO;
import com.hs_esslingen.insy.service.StatisticService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping("/statistics")
    public ResponseEntity<StatisticDTO> getStatistics() {
        StatisticDTO statistics = statisticService.getInventoryStatistics();
        return ResponseEntity.ok(statistics);
    }
}
