package com.vee.shazam.service;

import com.vee.shazam.service.dto.VeeResponseDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing VeeResponse.
 */
public interface VeeResponseService {

    /**
     * Save a veeResponse.
     *
     * @param veeResponseDTO the entity to save
     * @return the persisted entity
     */
    VeeResponseDTO save(VeeResponseDTO veeResponseDTO);

    /**
     * Get all the veeResponses.
     *
     * @return the list of entities
     */
    List<VeeResponseDTO> findAll();


    /**
     * Get the "id" veeResponse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<VeeResponseDTO> findOne(Long id);

    /**
     * Delete the "id" veeResponse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the veeResponse corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<VeeResponseDTO> search(String query);
}
