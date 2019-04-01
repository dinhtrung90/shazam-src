package com.vee.shazam.service;

import com.vee.shazam.service.dto.QuestionTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing QuestionType.
 */
public interface QuestionTypeService {

    /**
     * Save a questionType.
     *
     * @param questionTypeDTO the entity to save
     * @return the persisted entity
     */
    QuestionTypeDTO save(QuestionTypeDTO questionTypeDTO);

    /**
     * Get all the questionTypes.
     *
     * @return the list of entities
     */
    List<QuestionTypeDTO> findAll();


    /**
     * Get the "id" questionType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<QuestionTypeDTO> findOne(Long id);

    /**
     * Delete the "id" questionType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the questionType corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<QuestionTypeDTO> search(String query);
}
