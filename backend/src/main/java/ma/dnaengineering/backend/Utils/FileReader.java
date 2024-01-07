package ma.dnaengineering.backend.Utils;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class FileReader {

    /*
     Helper function to read file stored locally for test purposes
     */
    public static List<String> readFileByLine(String fileLocation) {

        try {
            Path chemin = Path.of(fileLocation);
           return Files.lines(chemin).toList();

        }catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /*
    Helper function to read the file that was serialized in the request body
    */
    public static List<String> readSentFileByLine(InputStream fileContent) {
        try {
            BufferedReader buffer = new BufferedReader(new InputStreamReader(fileContent));
            return buffer.lines().toList();
        }catch (UncheckedIOException e) {
            throw  new RuntimeException(e) ;
        }
    }
}
