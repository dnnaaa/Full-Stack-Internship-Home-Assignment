package ma.dnaengineering.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import ma.dnaengineering.backend.Model.Employee;
import ma.dnaengineering.backend.Service.ServiceData;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

class ControllerDataTest {

    @Test
    void testUploadCsvFile() throws IOException {
        ServiceData serviceData = new ServiceData();
        ControllerData controllerData = new ControllerData(serviceData);

        ResponseEntity<String> actualUploadCsvFileResult = controllerData.uploadCsvFile(
                new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));

        assertEquals("File uploaded and processed successfully.", actualUploadCsvFileResult.getBody());
        assertEquals(200, actualUploadCsvFileResult.getStatusCodeValue());
        assertTrue(actualUploadCsvFileResult.getHeaders().isEmpty());
        assertTrue(controllerData.getAllEmployees().getBody().isEmpty());
    }

    @Test
    void testUploadCsvFile2() throws IOException {
        ControllerData controllerData = new ControllerData(null);

        ResponseEntity<String> actualUploadCsvFileResult = controllerData.uploadCsvFile(
                new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));

        assertEquals("Error processing the file: Cannot invoke \"ma.dnaengineering.backend.Service.ServiceData.processCsv(org.springframework.web.multipart.MultipartFile)\" because \"this.serviceData\" is null",
                actualUploadCsvFileResult.getBody());
        assertEquals(500, actualUploadCsvFileResult.getStatusCodeValue());
        assertTrue(actualUploadCsvFileResult.getHeaders().isEmpty());
    }

    @Test
    void testUploadCsvFile3() throws IOException {
        ServiceData serviceData = mock(ServiceData.class);
        doNothing().when(serviceData).processCsv(Mockito.<MultipartFile>any());
        ControllerData controllerData = new ControllerData(serviceData);

        ResponseEntity<String> actualUploadCsvFileResult = controllerData.uploadCsvFile(
                new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));

        assertEquals("File uploaded and processed successfully.", actualUploadCsvFileResult.getBody());
        assertEquals(200, actualUploadCsvFileResult.getStatusCodeValue());
        assertTrue(actualUploadCsvFileResult.getHeaders().isEmpty());
        verify(serviceData).processCsv(Mockito.<MultipartFile>any());
    }

    @Test
    void testGetAllEmployees() {
        ControllerData controllerData = new ControllerData(new ServiceData());

        ResponseEntity<List<Employee>> actualAllEmployees = controllerData.getAllEmployees();

        assertTrue(actualAllEmployees.hasBody());
        assertEquals(200, actualAllEmployees.getStatusCodeValue());
        assertTrue(actualAllEmployees.getHeaders().isEmpty());
    }

    @Test
    void testGetAllEmployees3() {
        ServiceData serviceData = mock(ServiceData.class);
        when(serviceData.getAllEmployees()).thenReturn(new ArrayList<>());
        ControllerData controllerData = new ControllerData(serviceData);

        ResponseEntity<List<Employee>> actualAllEmployees = controllerData.getAllEmployees();

        assertTrue(actualAllEmployees.hasBody());
        assertEquals(200, actualAllEmployees.getStatusCodeValue());
        assertTrue(actualAllEmployees.getHeaders().isEmpty());
        verify(serviceData).getAllEmployees();
    }

    @Test
    void testGetJobTitleSummary() {
        ControllerData controllerData = new ControllerData(new ServiceData());

        ResponseEntity<List<String>> actualJobTitleSummary = controllerData.getJobTitleSummary();

        assertTrue(actualJobTitleSummary.hasBody());
        assertEquals(200, actualJobTitleSummary.getStatusCodeValue());
        assertTrue(actualJobTitleSummary.getHeaders().isEmpty());
    }

    @Test
    void testGetJobTitleSummary3() {
        ServiceData serviceData = mock(ServiceData.class);
        when(serviceData.getJobTitleSummary()).thenReturn(new ArrayList<>());
        ControllerData controllerData = new ControllerData(serviceData);

        ResponseEntity<List<String>> actualJobTitleSummary = controllerData.getJobTitleSummary();

        assertTrue(actualJobTitleSummary.hasBody());
        assertEquals(200, actualJobTitleSummary.getStatusCodeValue());
        assertTrue(actualJobTitleSummary.getHeaders().isEmpty());
        verify(serviceData).getJobTitleSummary();
    }
}

