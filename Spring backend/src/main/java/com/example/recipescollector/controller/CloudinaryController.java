package com.example.recipescollector.controller;


import com.example.recipescollector.service.CloudinaryService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
public class CloudinaryController {


    private CloudinaryService cloudinaryService;


    @PostMapping("/images/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        return cloudinaryService.upload(file);
    }

    @GetMapping("/downloadImg/{publicId}")
    public @ResponseBody
    ResponseEntity<ByteArrayResource> downloadImg(@PathVariable String publicId) {
        return cloudinaryService.downloadImg(publicId);
    }


}

