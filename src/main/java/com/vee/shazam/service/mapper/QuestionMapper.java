package com.vee.shazam.service.mapper;

import com.vee.shazam.domain.*;
import com.vee.shazam.service.dto.QuestionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Question and its DTO QuestionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {


    @Mapping(target = "questionTypes", ignore = true)
    @Mapping(target = "responseChoices", ignore = true)
    @Mapping(target = "res", ignore = true)
    Question toEntity(QuestionDTO questionDTO);

    default Question fromId(Long id) {
        if (id == null) {
            return null;
        }
        Question question = new Question();
        question.setId(id);
        return question;
    }
}
