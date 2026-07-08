package <%= package %>;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class <%= mainClass %>Test {

    @Test
    void returnsProjectName() {
        assertEquals("<%= projectName %>", <%= mainClass %>.projectName());
    }
}
