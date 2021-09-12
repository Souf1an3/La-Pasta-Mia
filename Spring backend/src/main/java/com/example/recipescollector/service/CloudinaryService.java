package com.example.recipescollector.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URL;
import java.util.Map;

@Service
public class CloudinaryService {


    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "bravesoul",
            "api_key", "755679189121759",
            "api_secret", "0RQQhh1UK-2ohWudqeEYHyMXToo"));

    public String upload(MultipartFile file) {

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("public_id", file.getOriginalFilename()));
            return uploadResult.get("public_id").toString();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());

            return null;
        }

    }



    public ResponseEntity<ByteArrayResource> downloadImg(String publicId) {


        // Generates the URL
        String format = "jpg";
        String cloudUrl = cloudinary.url().secure(true).format(format)
                .publicId(publicId)
                .generate();

        try {
            // Get a ByteArrayResource from the URL
            URL url = new URL(cloudUrl);
            InputStream inputStream = url.openStream();
            byte[] out = org.apache.commons.io.IOUtils.toByteArray(inputStream);
            ByteArrayResource resource = new ByteArrayResource(out);

            // Creates the headers
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("content-disposition", "attachment; filename=image.jpg");
            responseHeaders.add("Content-Type", "image/jpeg");

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .contentLength(out.length)
                    .body(resource);

        } catch (Exception ex) {
            return null;
        }
    }


    public static class FileStorageException extends RuntimeException {

        public FileStorageException(String message) {
            super(message);
        }

        public FileStorageException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}