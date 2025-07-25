package com.hs_esslingen.insy.controller;


import com.hs_esslingen.insy.dto.CostCenterDTO;
import com.hs_esslingen.insy.service.CostCenterService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/costCenters")
public class CostCenterController {

    private final CostCenterService costCenterService;

    @GetMapping
    public ResponseEntity<CostCenterDTO> getAllCostCenter() {
        CostCenterDTO costCenters = costCenterService.getAllCostCenter();
        return new ResponseEntity<>(costCenters, HttpStatus.OK);
    }
}