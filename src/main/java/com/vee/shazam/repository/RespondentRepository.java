package com.vee.shazam.repository;

import com.vee.shazam.domain.Respondent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Respondent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RespondentRepository extends JpaRepository<Respondent, Long> {

}
