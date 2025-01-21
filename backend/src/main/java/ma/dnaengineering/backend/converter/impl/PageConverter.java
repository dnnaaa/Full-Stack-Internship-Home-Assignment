package ma.dnaengineering.backend.converter.impl;

import ma.dnaengineering.backend.converter.Converter;
import ma.dnaengineering.backend.dto.PageData;
import ma.dnaengineering.backend.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class PageConverter implements Converter<Page<Job>, PageData> {
    private final JobConverter jobConverter;

    public PageConverter(JobConverter jobConverter) {
        this.jobConverter = jobConverter;
    }

    @Override
    public PageData convert(Page<Job> source) {
        return PageData.builder()
                .content(source.getContent().stream().map(jobConverter::convert).toList())
                .totalElements(source.getTotalElements())
                .number(source.getNumber())
                .size(source.getSize())
                .hasPrevious(source.hasPrevious())
                .hasNext(source.hasNext())
                .build();
    }

    @Override
    public Page<Job> convertReverse(PageData source) {
        throw new UnsupportedOperationException();
    }
}
