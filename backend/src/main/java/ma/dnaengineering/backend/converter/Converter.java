package ma.dnaengineering.backend.converter;

public interface Converter<S, T> {
    T convert(S source);
    S convertReverse(T source);
}
