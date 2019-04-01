package com.vee.shazam.service.impl;

import com.vee.shazam.service.QuestionTypeService;
import com.vee.shazam.domain.QuestionType;
import com.vee.shazam.repository.QuestionTypeRepository;
import com.vee.shazam.repository.search.QuestionTypeSearchRepository;
import com.vee.shazam.service.dto.QuestionTypeDTO;
import com.vee.shazam.service.mapper.QuestionTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing QuestionType.
 */
@Service
@Transactional
public class QuestionTypeServiceImpl implements QuestionTypeService {

    private final Logger log = LoggerFactory.getLogger(QuestionTypeServiceImpl.class);

    private final QuestionTypeRepository questionTypeRepository;

    private final QuestionTypeMapper questionTypeMapper;

    private final QuestionTypeSearchRepository questionTypeSearchRepository;

    public QuestionTypeServiceImpl(QuestionTypeRepository questionTypeRepository, QuestionTypeMapper questionTypeMapper, QuestionTypeSearchRepository questionTypeSearchRepository) {
        this.questionTypeRepository = questionTypeRepository;
        this.questionTypeMapper = questionTypeMapper;
        this.questionTypeSearchRepository = questionTypeSearchRepository;
    }

    /**
     * Save a questionType.
     *
     * @param questionTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public QuestionTypeDTO save(QuestionTypeDTO questionTypeDTO) {
        log.debug("Request to save QuestionType : {}", questionTypeDTO);
        QuestionType questionType = questionTypeMapper.toEntity(questionTypeDTO);
        questionType = questionTypeRepository.save(questionType);
        QuestionTypeDTO result = questionTypeMapper.toDto(questionType);
        questionTypeSearchRepository.save(questionType);
        return result;
    }

    /**
     * Get all the questionTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<QuestionTypeDTO> findAll() {
        log.debug("Request to get all QuestionTypes");
        return questionTypeRepository.findAll().stream()
            .map(questionTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one questionType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<QuestionTypeDTO> findOne(Long id) {
        log.debug("Request to get QuestionType : {}", id);
        return questionTypeRepository.findById(id)
            .map(questionTypeMapper::toDto);
    }

    /**
     * Delete the questionType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuestionType : {}", id);
        questionTypeRepository.deleteById(id);
        questionTypeSearchRepository.deleteById(id);
    }

    /**
     * Search for the questionType corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<QuestionTypeDTO> search(String query) {
        log.debug("Request to search QuestionTypes for query {}", query);
        return StreamSupport
            .stream(questionTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(questionTypeMapper::toDto)
            .collect(Collectors.toList());
    }
}
