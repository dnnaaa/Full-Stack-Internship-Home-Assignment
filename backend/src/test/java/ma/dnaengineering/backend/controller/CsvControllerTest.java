package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.Model.Employee;
import ma.dnaengineering.backend.Service.CsvService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class CsvControllerTest {

    @Test
    void testUploadCsvFile() throws IOException {

        CsvController csvController = new CsvController(new CsvService());
        ResponseEntity<String> actualUploadCsvFileResult = csvController
                .uploadCsvFile(new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));
        assertEquals("File uploaded and processed successfully.", actualUploadCsvFileResult.getBody());
        assertEquals(200, actualUploadCsvFileResult.getStatusCodeValue());
        assertTrue(actualUploadCsvFileResult.getHeaders().isEmpty());
        assertTrue(csvController.getAllEmployees().getBody().isEmpty());
    }


    @Test
    void testUploadCsvFile2() throws IOException {

        CsvController csvController = new CsvController(null);
        ResponseEntity<String> actualUploadCsvFileResult = csvController
                .uploadCsvFile(new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));
        assertEquals(
                "Error processing the file: Cannot invoke \"ma.dnaengineering.backend.Service.CsvService.processCsv(org"
                        + ".springframework.web.multipart.MultipartFile)\" because \"this.csvService\" is null",
                actualUploadCsvFileResult.getBody());
        assertEquals(500, actualUploadCsvFileResult.getStatusCodeValue());
        assertTrue(actualUploadCsvFileResult.getHeaders().isEmpty());
    }

    @Test
    void testUploadCsvFile3() throws IOException {

        CsvService csvService = mock(CsvService.class);
        doNothing().when(csvService).processCsv(Mockito.<MultipartFile>any());
        CsvController csvController = new CsvController(csvService);
        ResponseEntity<String> actualUploadCsvFileResult = csvController
                .uploadCsvFile(new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));
        assertEquals("File uploaded and processed successfully.", actualUploadCsvFileResult.getBody());
        assertEquals(200, actualUploadCsvFileResult.getStatusCodeValue());
        assertTrue(actualUploadCsvFileResult.getHeaders().isEmpty());
        verify(csvService).processCsv(Mockito.<MultipartFile>any());
    }


    @Test
    void testGetAllEmployees() {

        ResponseEntity<List<Employee>> actualAllEmployees = (new CsvController(new CsvService())).getAllEmployees();
        assertTrue(actualAllEmployees.hasBody());
        assertEquals(200, actualAllEmployees.getStatusCodeValue());
        assertTrue(actualAllEmployees.getHeaders().isEmpty());
    }

    @Test
    void testGetAllEmployees3() {

        CsvService csvService = mock(CsvService.class);
        when(csvService.getAllEmployees()).thenReturn(new ArrayList<>());
        ResponseEntity<List<Employee>> actualAllEmployees = (new CsvController(csvService)).getAllEmployees();
        assertTrue(actualAllEmployees.hasBody());
        assertEquals(200, actualAllEmployees.getStatusCodeValue());
        assertTrue(actualAllEmployees.getHeaders().isEmpty());
        verify(csvService).getAllEmployees();
    }

    @Test
    void testGetJobTitleSummary() {

        ResponseEntity<List<String>> actualJobTitleSummary = (new CsvController(new CsvService())).getJobTitleSummary();
        assertTrue(actualJobTitleSummary.hasBody());
        assertEquals(200, actualJobTitleSummary.getStatusCodeValue());
        assertTrue(actualJobTitleSummary.getHeaders().isEmpty());
    }


    @Test
    void testGetJobTitleSummary3() {

        CsvService csvService = mock(CsvService.class);
        when(csvService.getJobTitleSummary()).thenReturn(new ArrayList<>());
        ResponseEntity<List<String>> actualJobTitleSummary = (new CsvController(csvService)).getJobTitleSummary();
        assertTrue(actualJobTitleSummary.hasBody());
        assertEquals(200, actualJobTitleSummary.getStatusCodeValue());
        assertTrue(actualJobTitleSummary.getHeaders().isEmpty());
        verify(csvService).getJobTitleSummary();
    }
}

