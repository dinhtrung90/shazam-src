package com.vee.shazam.service;

import com.vee.shazam.service.dto.SurveyDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Survey.
 */
public interface SurveyService {

    /**
     * Save a survey.
     *
     * @param surveyDTO the entity to save
     * @return the persisted entity
     */
    SurveyDTO save(SurveyDTO surveyDTO);

    /**
     * Get all the surveys.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SurveyDTO> findAll(Pageable pageable);


    /**
     * Get the "id" survey.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SurveyDTO> findOne(Long id);

    /**
     * Delete the "id" survey.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the survey corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SurveyDTO> search(String query, Pageable pageable);
}
