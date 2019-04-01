package com.vee.shazam.repository;

import com.vee.shazam.domain.SurveyResponse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SurveyResponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long> {

}
