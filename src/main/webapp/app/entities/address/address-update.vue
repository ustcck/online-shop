<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="onlineShopApp.address.home.createOrEditLabel" v-text="$t('onlineShopApp.address.home.createOrEditLabel')">Create or edit a Address</h2>
                <div>
                    <div class="form-group" v-if="address.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="address.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlineShopApp.address.address1')" for="address-address1">Address 1</label>
                        <input type="text" class="form-control" name="address1" id="address-address1"
                            :class="{'valid': !$v.address.address1.$invalid, 'invalid': $v.address.address1.$invalid }" v-model="$v.address.address1.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlineShopApp.address.address2')" for="address-address2">Address 2</label>
                        <input type="text" class="form-control" name="address2" id="address-address2"
                            :class="{'valid': !$v.address.address2.$invalid, 'invalid': $v.address.address2.$invalid }" v-model="$v.address.address2.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlineShopApp.address.city')" for="address-city">City</label>
                        <input type="text" class="form-control" name="city" id="address-city"
                            :class="{'valid': !$v.address.city.$invalid, 'invalid': $v.address.city.$invalid }" v-model="$v.address.city.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlineShopApp.address.postcode')" for="address-postcode">Postcode</label>
                        <input type="text" class="form-control" name="postcode" id="address-postcode"
                            :class="{'valid': !$v.address.postcode.$invalid, 'invalid': $v.address.postcode.$invalid }" v-model="$v.address.postcode.$model"  required/>
                        <div v-if="$v.address.postcode.$anyDirty && $v.address.postcode.$invalid">
                            <small class="form-text text-danger" v-if="!$v.address.postcode.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.address.postcode.maxLength" v-text="$t('entity.validation.maxlength', {max: 10})">
                                This field cannot be longer than 10 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlineShopApp.address.country')" for="address-country">Country</label>
                        <input type="text" class="form-control" name="country" id="address-country"
                            :class="{'valid': !$v.address.country.$invalid, 'invalid': $v.address.country.$invalid }" v-model="$v.address.country.$model"  required/>
                        <div v-if="$v.address.country.$anyDirty && $v.address.country.$invalid">
                            <small class="form-text text-danger" v-if="!$v.address.country.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.address.country.maxLength" v-text="$t('entity.validation.maxlength', {max: 2})">
                                This field cannot be longer than 2 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlineShopApp.address.customer')" for="address-customer">Customer</label>
                        <select class="form-control" id="address-customer" name="customer" v-model="address.customer">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="address.customer && customerOption.id === address.customer.id ? address.customer : customerOption" v-for="customerOption in customers" :key="customerOption.id">{{customerOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.address.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./address-update.component.ts">
</script>
