package com.vee.shazam.repository;

import com.vee.shazam.domain.QuestionType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuestionType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionTypeRepository extends JpaRepository<QuestionType, Long> {

}
