package com.ustcck.shop.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.ustcck.shop.domain.WishList;
import com.ustcck.shop.domain.*; // for static metamodels
import com.ustcck.shop.repository.WishListRepository;
import com.ustcck.shop.service.dto.WishListCriteria;

/**
 * Service for executing complex queries for {@link WishList} entities in the database.
 * The main input is a {@link WishListCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link WishList} or a {@link Page} of {@link WishList} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class WishListQueryService extends QueryService<WishList> {

    private final Logger log = LoggerFactory.getLogger(WishListQueryService.class);

    private final WishListRepository wishListRepository;

    public WishListQueryService(WishListRepository wishListRepository) {
        this.wishListRepository = wishListRepository;
    }

    /**
     * Return a {@link List} of {@link WishList} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<WishList> findByCriteria(WishListCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<WishList> specification = createSpecification(criteria);
        return wishListRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link WishList} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<WishList> findByCriteria(WishListCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<WishList> specification = createSpecification(criteria);
        return wishListRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(WishListCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<WishList> specification = createSpecification(criteria);
        return wishListRepository.count(specification);
    }

    /**
     * Function to convert {@link WishListCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<WishList> createSpecification(WishListCriteria criteria) {
        Specification<WishList> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), WishList_.id));
            }
            if (criteria.getTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitle(), WishList_.title));
            }
            if (criteria.getRestricted() != null) {
                specification = specification.and(buildSpecification(criteria.getRestricted(), WishList_.restricted));
            }
            if (criteria.getProductId() != null) {
                specification = specification.and(buildSpecification(criteria.getProductId(),
                    root -> root.join(WishList_.products, JoinType.LEFT).get(Product_.id)));
            }
            if (criteria.getCustomerId() != null) {
                specification = specification.and(buildSpecification(criteria.getCustomerId(),
                    root -> root.join(WishList_.customer, JoinType.LEFT).get(Customer_.id)));
            }
        }
        return specification;
    }
}
