package <%= package %>.test.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import <%= package %>.MainClass;

class MainClassTest {

    @Test
    void returnsProjectName() {
        assertEquals("<%= projectName %>", MainClass.projectName());
    }
}
