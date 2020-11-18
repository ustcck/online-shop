package com.ustcck.shop.web.rest;

import com.ustcck.shop.domain.WishList;
import com.ustcck.shop.service.WishListService;
import com.ustcck.shop.web.rest.errors.BadRequestAlertException;
import com.ustcck.shop.service.dto.WishListCriteria;
import com.ustcck.shop.service.WishListQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ustcck.shop.domain.WishList}.
 */
@RestController
@RequestMapping("/api")
public class WishListResource {

    private final Logger log = LoggerFactory.getLogger(WishListResource.class);

    private static final String ENTITY_NAME = "wishList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WishListService wishListService;

    private final WishListQueryService wishListQueryService;

    public WishListResource(WishListService wishListService, WishListQueryService wishListQueryService) {
        this.wishListService = wishListService;
        this.wishListQueryService = wishListQueryService;
    }

    /**
     * {@code POST  /wish-lists} : Create a new wishList.
     *
     * @param wishList the wishList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new wishList, or with status {@code 400 (Bad Request)} if the wishList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/wish-lists")
    public ResponseEntity<WishList> createWishList(@Valid @RequestBody WishList wishList) throws URISyntaxException {
        log.debug("REST request to save WishList : {}", wishList);
        if (wishList.getId() != null) {
            throw new BadRequestAlertException("A new wishList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WishList result = wishListService.save(wishList);
        return ResponseEntity.created(new URI("/api/wish-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /wish-lists} : Updates an existing wishList.
     *
     * @param wishList the wishList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wishList,
     * or with status {@code 400 (Bad Request)} if the wishList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the wishList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/wish-lists")
    public ResponseEntity<WishList> updateWishList(@Valid @RequestBody WishList wishList) throws URISyntaxException {
        log.debug("REST request to update WishList : {}", wishList);
        if (wishList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WishList result = wishListService.save(wishList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wishList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /wish-lists} : get all the wishLists.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wishLists in body.
     */
    @GetMapping("/wish-lists")
    public ResponseEntity<List<WishList>> getAllWishLists(WishListCriteria criteria) {
        log.debug("REST request to get WishLists by criteria: {}", criteria);
        List<WishList> entityList = wishListQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /wish-lists/count} : count all the wishLists.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/wish-lists/count")
    public ResponseEntity<Long> countWishLists(WishListCriteria criteria) {
        log.debug("REST request to count WishLists by criteria: {}", criteria);
        return ResponseEntity.ok().body(wishListQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /wish-lists/:id} : get the "id" wishList.
     *
     * @param id the id of the wishList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the wishList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/wish-lists/{id}")
    public ResponseEntity<WishList> getWishList(@PathVariable Long id) {
        log.debug("REST request to get WishList : {}", id);
        Optional<WishList> wishList = wishListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(wishList);
    }

    /**
     * {@code DELETE  /wish-lists/:id} : delete the "id" wishList.
     *
     * @param id the id of the wishList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/wish-lists/{id}")
    public ResponseEntity<Void> deleteWishList(@PathVariable Long id) {
        log.debug("REST request to delete WishList : {}", id);
        wishListService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
