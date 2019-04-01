package com.vee.shazam.repository;

import com.vee.shazam.domain.ResponseChoice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ResponseChoice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResponseChoiceRepository extends JpaRepository<ResponseChoice, Long> {

}
