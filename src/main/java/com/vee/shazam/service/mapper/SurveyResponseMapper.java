package com.vee.shazam.service.mapper;

import com.vee.shazam.domain.*;
import com.vee.shazam.service.dto.SurveyResponseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SurveyResponse and its DTO SurveyResponseDTO.
 */
@Mapper(componentModel = "spring", uses = {SurveyMapper.class, RespondentMapper.class})
public interface SurveyResponseMapper extends EntityMapper<SurveyResponseDTO, SurveyResponse> {

    @Mapping(source = "survey.id", target = "surveyId")
    @Mapping(source = "respondent.id", target = "respondentId")
    SurveyResponseDTO toDto(SurveyResponse surveyResponse);

    @Mapping(source = "surveyId", target = "survey")
    @Mapping(source = "respondentId", target = "respondent")
    SurveyResponse toEntity(SurveyResponseDTO surveyResponseDTO);

    default SurveyResponse fromId(Long id) {
        if (id == null) {
            return null;
        }
        SurveyResponse surveyResponse = new SurveyResponse();
        surveyResponse.setId(id);
        return surveyResponse;
    }
}
