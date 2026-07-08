package <%= package %>;

/**
 * Placeholder entry point for the <%= projectName %> library.
 */
public final class MainClass {

    private MainClass() {
        throw new UnsupportedOperationException("Utility class");
    }

    /**
     * Returns the generated project name.
     *
     * @return the project name
     */
    public static String projectName() {
        return "<%= projectName %>";
    }
}
