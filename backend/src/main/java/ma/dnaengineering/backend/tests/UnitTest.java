package ma.dnaengineering.backend.tests;

import ma.dnaengineering.backend.entities.EmployeEntity;
import ma.dnaengineering.backend.entities.ParserEntity;
import ma.dnaengineering.backend.services.ParserService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mock;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UnitTest {

    @InjectMocks
    private ParserService parserService;

    @Mock
    private MultipartFile mockFile;

    @Test
    void testProcessCsv() throws IOException {
        
        List<ParserEntity> mockCsvDataList = List.of(new ParserEntity("1", "Jon Ball", "Mobile App Developer", 7348.0));
        when(parserService.parseCsv(mockFile)).thenReturn(mockCsvDataList);

        List<EmployeEntity> mockEmployees = List.of(new EmployeEntity("1", "Jon Ball", "Mobile App Developer", 7348.0));
        when(parserService.processRows(mockCsvDataList)).thenReturn(mockEmployees);

        Map<String, Double> mockAverageSalaries = Map.of("IT Recruiter", 8755.864864864865);
        when(parserService.calculateAverageSalaries(mockEmployees)).thenReturn(mockAverageSalaries);

        Map<String, Object> result = parserService.processCsv(mockFile);
        
        assertEquals(mockEmployees, result.get("employees"));
        assertEquals(mockAverageSalaries, result.get("averageSalaries"));
    }
}
