package com.vee.shazam.service.mapper;

import com.vee.shazam.domain.*;
import com.vee.shazam.service.dto.SurveyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Survey and its DTO SurveyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SurveyMapper extends EntityMapper<SurveyDTO, Survey> {


    @Mapping(target = "questionOrders", ignore = true)
    @Mapping(target = "surveyResponses", ignore = true)
    Survey toEntity(SurveyDTO surveyDTO);

    default Survey fromId(Long id) {
        if (id == null) {
            return null;
        }
        Survey survey = new Survey();
        survey.setId(id);
        return survey;
    }
}
