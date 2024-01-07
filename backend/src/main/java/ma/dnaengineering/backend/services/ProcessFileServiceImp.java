package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.beans.FileData;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
@Service
public class ProcessFileServiceImp implements ProcessFileService{
    @Override
    public ArrayList<FileData> processFile(MultipartFile file) throws IOException,RuntimeException {
        InputStream inputStream = file.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        ArrayList<FileData> employees=new ArrayList<>();
        // The first line is for the headers
        String line= reader.readLine();
        var countLine=0;
        while ((line = reader.readLine()) != null) {
            countLine++;
            String[] values = line.split(",");
            if (values.length!=4)
                throw new RuntimeException("Problems at line "+countLine+":Each line within the file should have exactly 4 columns");
            FileData fileData=new FileData();
            for (String value : values) {
                try {
                    fileData.setId(Integer.parseInt(values[0]));
                    fileData.setEmployeeName(values[1]);
                    fileData.setJobTitle(values[2]);
                    fileData.setSalary(Double.parseDouble(values[3]));
                }catch (NumberFormatException e){throw new RuntimeException("Problems at line "+countLine+":Invalid value for one or more column ");}
            }
            employees.add(fileData);
        }
            return employees;
    }
}
