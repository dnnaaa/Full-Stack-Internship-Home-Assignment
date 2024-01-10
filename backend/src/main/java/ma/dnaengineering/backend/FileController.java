package ma.dnaengineering.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

import static ma.dnaengineering.backend.EmployeeParser.parse;

@RestController
public class FileController {

    // Variable pour stocker le nom de fichier
    private String uploadedFileName;

    @PostMapping("/processFile")
    public ResponseEntity<String> processFile(@RequestPart("file") MultipartFile file) {
        // Vérifier si le fichier est vide
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Aucun fichier sélectionné.");
        }

        // Définir le répertoire de destination
        String uploadDir = "data_recu/";

        // Assurez-vous que le répertoire existe, sinon, créez-le
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        // Générer un nom de fichier unique
        uploadedFileName = file.getOriginalFilename();

        // Construire le chemin complet pour le fichier
        Path filePath = Path.of(uploadDir, uploadedFileName);

        try {
            // Copier le contenu du fichier dans le répertoire de destination
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Vous pouvez également effectuer d'autres opérations sur le fichier ici si nécessaire

            // Renvoyer une réponse au frontend
            return ResponseEntity.ok("Fichier enregistré avec succès : " + uploadedFileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de l'enregistrement du fichier.");
        }
    }
    private static final String UPLOAD_DIR = "data_recu/";

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getPaginatedEmployees() throws IOException {
        System.out.printf("employees");

            FileInputStream inputStream1 = new FileInputStream("data/employees.csv");
            EmployeeParser parser = new EmployeeParser();
            List<Employee> employees = parser.parse(inputStream1);

            return ResponseEntity.ok(employees);

    }

    @GetMapping("/jobSummary")
    public ResponseEntity<List<JobSummary>> getJobSummary() throws IOException {
        FileInputStream inputStream = new FileInputStream("data/employees.csv");
        EmployeeParser parser = new EmployeeParser();
        List<Employee> employees = parser.parse(inputStream);
        List<JobSummary> averageSalaryByJobTitle = EmployeeService.getAverageSalaryByJobTitle(employees);

        return ResponseEntity.ok(averageSalaryByJobTitle);
    }
}
