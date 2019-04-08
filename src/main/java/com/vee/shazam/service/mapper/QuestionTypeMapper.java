package com.vee.shazam.service.mapper;

import com.vee.shazam.domain.*;
import com.vee.shazam.service.dto.QuestionTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity QuestionType and its DTO QuestionTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface QuestionTypeMapper extends EntityMapper<QuestionTypeDTO, QuestionType> {



    default QuestionType fromId(Long id) {
        if (id == null) {
            return null;
        }
        QuestionType questionType = new QuestionType();
        questionType.setId(id);
        return questionType;
    }
}
