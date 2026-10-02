/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
/**
 * A custom key-value pair that stores additional information on a
 * [cart](https://shopify.dev/docs/api/storefront/current/objects/Cart) or [cart
 * line](https://shopify.dev/docs/api/storefront/current/objects/CartLine).
 * Attributes capture additional information like gift messages, special
 * instructions, or custom order details. Learn more about [managing carts with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage).
 */
export type AttributeInput = {
  /** Key or name of the attribute. */
  key: string;
  /** Value of the attribute. */
  value: string;
};

/**
 * Specifies a delivery address for a cart. Provide either a [`deliveryAddress`](https://shopify.dev/docs/api/storefront/current/input-objects/CartAddressInput#fields-deliveryAddress)
 * with full address details, or a [`copyFromCustomerAddressId`](https://shopify.dev/docs/api/storefront/current/input-objects/CartAddressInput#fields-copyFromCustomerAddressId)
 * to copy from an existing customer address. Used by [`CartSelectableAddressInput`](https://shopify.dev/docs/api/storefront/current/input-objects/CartSelectableAddressInput) and [`CartSelectableAddressUpdateInput`](https://shopify.dev/docs/api/storefront/current/input-objects/CartSelectableAddressUpdateInput).
 */
export type CartAddressInput = {
  /** Copies details from the customer address to an address on this cart. */
  copyFromCustomerAddressId?: string | number | null | undefined;
  /** A delivery address stored on this cart. */
  deliveryAddress?: CartDeliveryAddressInput | null | undefined;
};

/**
 * The input fields for identifying the buyer associated with a cart. Buyer
 * identity determines [international pricing](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/markets/international-pricing)
 * and should match the customer's shipping address.
 *
 * Used by [`cartCreate`](https://shopify.dev/docs/api/storefront/current/mutations/cartCreate) and [`cartBuyerIdentityUpdate`](https://shopify.dev/docs/api/storefront/current/mutations/cartBuyerIdentityUpdate) to set contact information, location, and checkout preferences.
 *
 * > Note:
 * > Preferences prefill fields at checkout but don't sync back to the cart if overwritten.
 */
export type CartBuyerIdentityInput = {
  /** The company location of the buyer that is interacting with the cart. */
  companyLocationId?: string | number | null | undefined;
  /** The country where the buyer is located. */
  countryCode?: CountryCode | null | undefined;
  /** The access token used to identify the customer associated with the cart. */
  customerAccessToken?: string | null | undefined;
  /** The email address of the buyer that is interacting with the cart. */
  email?: string | null | undefined;
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: string | null | undefined;
  /**
   * A set of preferences tied to the buyer interacting with the cart. Preferences
   * are used to prefill fields in at checkout to streamline information collection.
   * Preferences are not synced back to the cart if they are overwritten.
   */
  preferences?: CartPreferencesInput | null | undefined;
};

/** The input fields to create or update a cart address. */
export type CartDeliveryAddressInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: string | null | undefined;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: string | null | undefined;
  /** A country-specific address code, such as the Saudi Arabia short address code. */
  addressCode?: string | null | undefined;
  /** The structured components of `address1` and `address2` of the delivery address. */
  addressLineComponents?: CartDeliveryAddressLineComponentsInput | null | undefined;
  /** The name of the city, district, village, or town. */
  city?: string | null | undefined;
  /** The name of the customer's company or organization. */
  company?: string | null | undefined;
  /** The name of the country. */
  countryCode?: CountryCode | null | undefined;
  /** The first name of the customer. */
  firstName?: string | null | undefined;
  /** The last name of the customer. */
  lastName?: string | null | undefined;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: string | null | undefined;
  /** The region of the address, such as the province, state, or district. */
  provinceCode?: string | null | undefined;
  /** The zip or postal code of the address. */
  zip?: string | null | undefined;
};

/** The input fields for the structured components of `address1` and `address2` of a cart delivery address. */
export type CartDeliveryAddressLineComponentsInput = {
  /** Additional address information, such as apartment, suite, or unit. */
  additionalInformation?: string | null | undefined;
  /** A regional or city subdivision, such as county, metropolitan region, neighborhood, or ward. */
  district?: string | null | undefined;
  /** The street name, without house number. */
  streetName?: string | null | undefined;
  /** The house or building number. */
  streetNumber?: string | null | undefined;
  /** A finer subdivision within the district, when the country uses both. */
  subdistrict?: string | null | undefined;
};

/** Preferred location used to find the closest pick up point based on coordinates. */
export type CartDeliveryCoordinatesPreferenceInput = {
  /**
   * The two-letter code for the country of the preferred location.
   *
   * For example, US.
   */
  countryCode: CountryCode;
  /** The geographic latitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  latitude: number;
  /** The geographic longitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  longitude: number;
};

/** The input fields for the cart's delivery properties. */
export type CartDeliveryInput = {
  /**
   * Selectable addresses to present to the buyer on the cart.
   *
   * The input must not contain more than `250` values.
   */
  addresses?: Array<CartSelectableAddressInput> | null | undefined;
};

/** Delivery preferences can be used to prefill the delivery section at checkout. */
export type CartDeliveryPreferenceInput = {
  /** The coordinates of a delivery location in order of preference. */
  coordinates?: CartDeliveryCoordinatesPreferenceInput | null | undefined;
  /**
   * The preferred delivery methods such as shipping, local pickup or through pickup points.
   *
   * The input must not contain more than `250` values.
   */
  deliveryMethod?: Array<PreferenceDeliveryMethodType> | null | undefined;
  /**
   * The pickup handle prefills checkout fields with the location for either local pickup or pickup points delivery methods.
   * It accepts both location ID for local pickup and external IDs for pickup points.
   *
   * The input must not contain more than `250` values.
   */
  pickupHandle?: Array<string> | null | undefined;
};

/**
 * The input fields for creating a
 * [`Cart`](https://shopify.dev/docs/api/storefront/current/objects/Cart). Used by the [`cartCreate`](https://shopify.dev/docs/api/storefront/current/mutations/cartCreate) mutation.
 *
 * Accepts merchandise lines, discount codes, gift card codes, and a note. You can
 * also set custom attributes, metafields, buyer identity for international
 * pricing, and delivery addresses.
 */
export type CartInput = {
  /**
   * An array of key-value pairs that contains additional information about the cart.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: Array<AttributeInput> | null | undefined;
  /**
   * The customer associated with the cart. Used to determine [international pricing]
   * (https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * Buyer identity should match the customer's shipping address.
   */
  buyerIdentity?: CartBuyerIdentityInput | null | undefined;
  /** The delivery-related fields for the cart. */
  delivery?: CartDeliveryInput | null | undefined;
  /**
   * The case-insensitive discount codes that the customer added at checkout.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes?: Array<string> | null | undefined;
  /**
   * The case-insensitive gift card codes.
   *
   * The input must not contain more than `250` values.
   */
  giftCardCodes?: Array<string> | null | undefined;
  /**
   * A list of merchandise lines to add to the cart.
   *
   * The input must not contain more than `250` values.
   */
  lines?: Array<CartLineInput> | null | undefined;
  /**
   * The metafields to associate with this cart.
   *
   * The input must not contain more than `250` values.
   */
  metafields?: Array<CartInputMetafieldInput> | null | undefined;
  /** A note that's associated with the cart. For example, the note can be a personalized message to the buyer. */
  note?: string | null | undefined;
  /**
   * The source name of the channel to use for order attribution.
   * The value must match the source name of a channel that the client, identified by the storefront access token, owns.
   */
  sourceName?: string | null | undefined;
};

/**
 * The input fields for a cart metafield value to set.
 *
 * Cart metafields will be copied to order metafields at order creation time if
 * there is a matching order metafield definition with the [`cart to order copyable`](https://shopify.dev/docs/apps/build/metafields/use-metafield-capabilities#cart-to-order-copyable)
 * capability enabled.
 */
export type CartInputMetafieldInput = {
  /** The key name of the metafield. */
  key: string;
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   */
  type: string;
  /** The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type. */
  value: string;
};

/**
 * The input fields for adding a merchandise line to a cart. Each line represents a [`ProductVariant`](https://shopify.dev/docs/api/storefront/current/objects/ProductVariant)
 * the buyer intends to purchase, along with the quantity and optional [`SellingPlan`](https://shopify.dev/docs/api/storefront/current/objects/SellingPlan)
 * for subscriptions.
 *
 * Used by the [`cartCreate`](https://shopify.dev/docs/api/storefront/current/mutations/cartCreate) mutation when creating a cart with initial items, and the [`cartLinesAdd`](https://shopify.dev/docs/api/storefront/current/mutations/cartLinesAdd)
 * mutation when adding items to an existing cart.
 */
export type CartLineInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: Array<AttributeInput> | null | undefined;
  /** The ID of the merchandise that the buyer intends to purchase. */
  merchandiseId: string | number;
  /** The parent line item of the cart line. */
  parent?: CartLineParentInput | null | undefined;
  /** The quantity of the merchandise. */
  quantity?: number | null | undefined;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: string | number | null | undefined;
};

/** The parent line item of the cart line. */
export type CartLineParentInput = {
  /** The id of the parent line item. */
  lineId?: string | number | null | undefined;
  /** The ID of the parent line merchandise. */
  merchandiseId?: string | number | null | undefined;
};

/**
 * The input fields for updating a merchandise line in a cart. Used by the [`cartLinesUpdate`](https://shopify.dev/docs/api/storefront/current/mutations/cartLinesUpdate) mutation.
 *
 * Specify the line item's [`id`](https://shopify.dev/docs/api/storefront/current/input-objects/CartLineUpdateInput#fields-id)
 * along with any fields to modify. You can change the quantity, swap the
 * merchandise, update custom attributes, or associate a different selling plan.
 */
export type CartLineUpdateInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: Array<AttributeInput> | null | undefined;
  /** The ID of the merchandise line. Mutually exclusive with `viewKey`. */
  id?: string | number | null | undefined;
  /** The ID of the merchandise for the line item. */
  merchandiseId?: string | number | null | undefined;
  /** The quantity of the line item. */
  quantity?: number | null | undefined;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: string | number | null | undefined;
  /**
   * The `view_key` of the merchandise line, as exposed in Liquid via the cart line
   * `view_key` filter. Mutually exclusive with `id`.
   */
  viewKey?: string | null | undefined;
};

/** The input fields represent preferences for the buyer that is interacting with the cart. */
export type CartPreferencesInput = {
  /** Delivery preferences can be used to prefill the delivery section in at checkout. */
  delivery?: CartDeliveryPreferenceInput | null | undefined;
  /**
   * Wallet preferences are used to populate relevant payment fields in the checkout flow.
   * Accepted value: `["shop_pay"]`.
   *
   * The input must not contain more than `250` values.
   */
  wallet?: Array<string> | null | undefined;
};

/**
 * The input fields for a selectable delivery address to present to the buyer. Used by [`CartDeliveryInput`](https://shopify.dev/docs/api/storefront/current/input-objects/CartDeliveryInput)
 * when creating a cart with the [`cartCreate`](https://shopify.dev/docs/api/storefront/current/mutations/cartCreate) mutation.
 *
 * You can pre-select an address for the buyer, mark it as one-time use so it isn't
 * saved after checkout, and specify how strictly the address should be validated.
 */
export type CartSelectableAddressInput = {
  /** Exactly one kind of delivery address. */
  address: CartAddressInput;
  /** When true, this delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse?: boolean | null | undefined;
  /** Sets exactly one address as pre-selected for the buyer. */
  selected?: boolean | null | undefined;
  /** Defines what kind of address validation is requested. */
  validationStrategy?: DeliveryAddressValidationStrategy | null | undefined;
};

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 */
export type CountryCode =
  /** Ascension Island. */
  | 'AC'
  /** Andorra. */
  | 'AD'
  /** United Arab Emirates. */
  | 'AE'
  /** Afghanistan. */
  | 'AF'
  /** Antigua & Barbuda. */
  | 'AG'
  /** Anguilla. */
  | 'AI'
  /** Albania. */
  | 'AL'
  /** Armenia. */
  | 'AM'
  /** Netherlands Antilles. */
  | 'AN'
  /** Angola. */
  | 'AO'
  /** Argentina. */
  | 'AR'
  /** Austria. */
  | 'AT'
  /** Australia. */
  | 'AU'
  /** Aruba. */
  | 'AW'
  /** Åland Islands. */
  | 'AX'
  /** Azerbaijan. */
  | 'AZ'
  /** Bosnia & Herzegovina. */
  | 'BA'
  /** Barbados. */
  | 'BB'
  /** Bangladesh. */
  | 'BD'
  /** Belgium. */
  | 'BE'
  /** Burkina Faso. */
  | 'BF'
  /** Bulgaria. */
  | 'BG'
  /** Bahrain. */
  | 'BH'
  /** Burundi. */
  | 'BI'
  /** Benin. */
  | 'BJ'
  /** St. Barthélemy. */
  | 'BL'
  /** Bermuda. */
  | 'BM'
  /** Brunei. */
  | 'BN'
  /** Bolivia. */
  | 'BO'
  /** Caribbean Netherlands. */
  | 'BQ'
  /** Brazil. */
  | 'BR'
  /** Bahamas. */
  | 'BS'
  /** Bhutan. */
  | 'BT'
  /** Bouvet Island. */
  | 'BV'
  /** Botswana. */
  | 'BW'
  /** Belarus. */
  | 'BY'
  /** Belize. */
  | 'BZ'
  /** Canada. */
  | 'CA'
  /** Cocos (Keeling) Islands. */
  | 'CC'
  /** Congo - Kinshasa. */
  | 'CD'
  /** Central African Republic. */
  | 'CF'
  /** Congo - Brazzaville. */
  | 'CG'
  /** Switzerland. */
  | 'CH'
  /** Côte d’Ivoire. */
  | 'CI'
  /** Cook Islands. */
  | 'CK'
  /** Chile. */
  | 'CL'
  /** Cameroon. */
  | 'CM'
  /** China. */
  | 'CN'
  /** Colombia. */
  | 'CO'
  /** Costa Rica. */
  | 'CR'
  /** Cuba. */
  | 'CU'
  /** Cape Verde. */
  | 'CV'
  /** Curaçao. */
  | 'CW'
  /** Christmas Island. */
  | 'CX'
  /** Cyprus. */
  | 'CY'
  /** Czechia. */
  | 'CZ'
  /** Germany. */
  | 'DE'
  /** Djibouti. */
  | 'DJ'
  /** Denmark. */
  | 'DK'
  /** Dominica. */
  | 'DM'
  /** Dominican Republic. */
  | 'DO'
  /** Algeria. */
  | 'DZ'
  /** Ecuador. */
  | 'EC'
  /** Estonia. */
  | 'EE'
  /** Egypt. */
  | 'EG'
  /** Western Sahara. */
  | 'EH'
  /** Eritrea. */
  | 'ER'
  /** Spain. */
  | 'ES'
  /** Ethiopia. */
  | 'ET'
  /** Finland. */
  | 'FI'
  /** Fiji. */
  | 'FJ'
  /** Falkland Islands. */
  | 'FK'
  /** Faroe Islands. */
  | 'FO'
  /** France. */
  | 'FR'
  /** Gabon. */
  | 'GA'
  /** United Kingdom. */
  | 'GB'
  /** Grenada. */
  | 'GD'
  /** Georgia. */
  | 'GE'
  /** French Guiana. */
  | 'GF'
  /** Guernsey. */
  | 'GG'
  /** Ghana. */
  | 'GH'
  /** Gibraltar. */
  | 'GI'
  /** Greenland. */
  | 'GL'
  /** Gambia. */
  | 'GM'
  /** Guinea. */
  | 'GN'
  /** Guadeloupe. */
  | 'GP'
  /** Equatorial Guinea. */
  | 'GQ'
  /** Greece. */
  | 'GR'
  /** South Georgia & South Sandwich Islands. */
  | 'GS'
  /** Guatemala. */
  | 'GT'
  /** Guinea-Bissau. */
  | 'GW'
  /** Guyana. */
  | 'GY'
  /** Hong Kong SAR. */
  | 'HK'
  /** Heard & McDonald Islands. */
  | 'HM'
  /** Honduras. */
  | 'HN'
  /** Croatia. */
  | 'HR'
  /** Haiti. */
  | 'HT'
  /** Hungary. */
  | 'HU'
  /** Indonesia. */
  | 'ID'
  /** Ireland. */
  | 'IE'
  /** Israel. */
  | 'IL'
  /** Isle of Man. */
  | 'IM'
  /** India. */
  | 'IN'
  /** British Indian Ocean Territory. */
  | 'IO'
  /** Iraq. */
  | 'IQ'
  /** Iran. */
  | 'IR'
  /** Iceland. */
  | 'IS'
  /** Italy. */
  | 'IT'
  /** Jersey. */
  | 'JE'
  /** Jamaica. */
  | 'JM'
  /** Jordan. */
  | 'JO'
  /** Japan. */
  | 'JP'
  /** Kenya. */
  | 'KE'
  /** Kyrgyzstan. */
  | 'KG'
  /** Cambodia. */
  | 'KH'
  /** Kiribati. */
  | 'KI'
  /** Comoros. */
  | 'KM'
  /** St. Kitts & Nevis. */
  | 'KN'
  /** North Korea. */
  | 'KP'
  /** South Korea. */
  | 'KR'
  /** Kuwait. */
  | 'KW'
  /** Cayman Islands. */
  | 'KY'
  /** Kazakhstan. */
  | 'KZ'
  /** Laos. */
  | 'LA'
  /** Lebanon. */
  | 'LB'
  /** St. Lucia. */
  | 'LC'
  /** Liechtenstein. */
  | 'LI'
  /** Sri Lanka. */
  | 'LK'
  /** Liberia. */
  | 'LR'
  /** Lesotho. */
  | 'LS'
  /** Lithuania. */
  | 'LT'
  /** Luxembourg. */
  | 'LU'
  /** Latvia. */
  | 'LV'
  /** Libya. */
  | 'LY'
  /** Morocco. */
  | 'MA'
  /** Monaco. */
  | 'MC'
  /** Moldova. */
  | 'MD'
  /** Montenegro. */
  | 'ME'
  /** St. Martin. */
  | 'MF'
  /** Madagascar. */
  | 'MG'
  /** North Macedonia. */
  | 'MK'
  /** Mali. */
  | 'ML'
  /** Myanmar (Burma). */
  | 'MM'
  /** Mongolia. */
  | 'MN'
  /** Macao SAR. */
  | 'MO'
  /** Martinique. */
  | 'MQ'
  /** Mauritania. */
  | 'MR'
  /** Montserrat. */
  | 'MS'
  /** Malta. */
  | 'MT'
  /** Mauritius. */
  | 'MU'
  /** Maldives. */
  | 'MV'
  /** Malawi. */
  | 'MW'
  /** Mexico. */
  | 'MX'
  /** Malaysia. */
  | 'MY'
  /** Mozambique. */
  | 'MZ'
  /** Namibia. */
  | 'NA'
  /** New Caledonia. */
  | 'NC'
  /** Niger. */
  | 'NE'
  /** Norfolk Island. */
  | 'NF'
  /** Nigeria. */
  | 'NG'
  /** Nicaragua. */
  | 'NI'
  /** Netherlands. */
  | 'NL'
  /** Norway. */
  | 'NO'
  /** Nepal. */
  | 'NP'
  /** Nauru. */
  | 'NR'
  /** Niue. */
  | 'NU'
  /** New Zealand. */
  | 'NZ'
  /** Oman. */
  | 'OM'
  /** Panama. */
  | 'PA'
  /** Peru. */
  | 'PE'
  /** French Polynesia. */
  | 'PF'
  /** Papua New Guinea. */
  | 'PG'
  /** Philippines. */
  | 'PH'
  /** Pakistan. */
  | 'PK'
  /** Poland. */
  | 'PL'
  /** St. Pierre & Miquelon. */
  | 'PM'
  /** Pitcairn Islands. */
  | 'PN'
  /** Palestinian Territories. */
  | 'PS'
  /** Portugal. */
  | 'PT'
  /** Paraguay. */
  | 'PY'
  /** Qatar. */
  | 'QA'
  /** Réunion. */
  | 'RE'
  /** Romania. */
  | 'RO'
  /** Serbia. */
  | 'RS'
  /** Russia. */
  | 'RU'
  /** Rwanda. */
  | 'RW'
  /** Saudi Arabia. */
  | 'SA'
  /** Solomon Islands. */
  | 'SB'
  /** Seychelles. */
  | 'SC'
  /** Sudan. */
  | 'SD'
  /** Sweden. */
  | 'SE'
  /** Singapore. */
  | 'SG'
  /** St. Helena. */
  | 'SH'
  /** Slovenia. */
  | 'SI'
  /** Svalbard & Jan Mayen. */
  | 'SJ'
  /** Slovakia. */
  | 'SK'
  /** Sierra Leone. */
  | 'SL'
  /** San Marino. */
  | 'SM'
  /** Senegal. */
  | 'SN'
  /** Somalia. */
  | 'SO'
  /** Suriname. */
  | 'SR'
  /** South Sudan. */
  | 'SS'
  /** São Tomé & Príncipe. */
  | 'ST'
  /** El Salvador. */
  | 'SV'
  /** Sint Maarten. */
  | 'SX'
  /** Syria. */
  | 'SY'
  /** Eswatini. */
  | 'SZ'
  /** Tristan da Cunha. */
  | 'TA'
  /** Turks & Caicos Islands. */
  | 'TC'
  /** Chad. */
  | 'TD'
  /** French Southern Territories. */
  | 'TF'
  /** Togo. */
  | 'TG'
  /** Thailand. */
  | 'TH'
  /** Tajikistan. */
  | 'TJ'
  /** Tokelau. */
  | 'TK'
  /** Timor-Leste. */
  | 'TL'
  /** Turkmenistan. */
  | 'TM'
  /** Tunisia. */
  | 'TN'
  /** Tonga. */
  | 'TO'
  /** Türkiye. */
  | 'TR'
  /** Trinidad & Tobago. */
  | 'TT'
  /** Tuvalu. */
  | 'TV'
  /** Taiwan. */
  | 'TW'
  /** Tanzania. */
  | 'TZ'
  /** Ukraine. */
  | 'UA'
  /** Uganda. */
  | 'UG'
  /** U.S. Outlying Islands. */
  | 'UM'
  /** United States. */
  | 'US'
  /** Uruguay. */
  | 'UY'
  /** Uzbekistan. */
  | 'UZ'
  /** Vatican City. */
  | 'VA'
  /** St. Vincent & Grenadines. */
  | 'VC'
  /** Venezuela. */
  | 'VE'
  /** British Virgin Islands. */
  | 'VG'
  /** Vietnam. */
  | 'VN'
  /** Vanuatu. */
  | 'VU'
  /** Wallis & Futuna. */
  | 'WF'
  /** Samoa. */
  | 'WS'
  /** Kosovo. */
  | 'XK'
  /** Yemen. */
  | 'YE'
  /** Mayotte. */
  | 'YT'
  /** South Africa. */
  | 'ZA'
  /** Zambia. */
  | 'ZM'
  /** Zimbabwe. */
  | 'ZW'
  /** Unknown Region. */
  | 'ZZ';

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 */
export type CurrencyCode =
  /** United Arab Emirates Dirham (AED). */
  | 'AED'
  /** Afghan Afghani (AFN). */
  | 'AFN'
  /** Albanian Lek (ALL). */
  | 'ALL'
  /** Armenian Dram (AMD). */
  | 'AMD'
  /** Netherlands Antillean Guilder. */
  | 'ANG'
  /** Angolan Kwanza (AOA). */
  | 'AOA'
  /** Argentine Pesos (ARS). */
  | 'ARS'
  /** Australian Dollars (AUD). */
  | 'AUD'
  /** Aruban Florin (AWG). */
  | 'AWG'
  /** Azerbaijani Manat (AZN). */
  | 'AZN'
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  | 'BAM'
  /** Barbadian Dollar (BBD). */
  | 'BBD'
  /** Bangladesh Taka (BDT). */
  | 'BDT'
  /** Bulgarian Lev (BGN). */
  | 'BGN'
  /** Bahraini Dinar (BHD). */
  | 'BHD'
  /** Burundian Franc (BIF). */
  | 'BIF'
  /** Bermudian Dollar (BMD). */
  | 'BMD'
  /** Brunei Dollar (BND). */
  | 'BND'
  /** Bolivian Boliviano (BOB). */
  | 'BOB'
  /** Brazilian Real (BRL). */
  | 'BRL'
  /** Bahamian Dollar (BSD). */
  | 'BSD'
  /** Bhutanese Ngultrum (BTN). */
  | 'BTN'
  /** Botswana Pula (BWP). */
  | 'BWP'
  /** Belarusian Ruble (BYN). */
  | 'BYN'
  /** Belarusian Ruble (BYR). */
  | 'BYR'
  /** Belize Dollar (BZD). */
  | 'BZD'
  /** Canadian Dollars (CAD). */
  | 'CAD'
  /** Congolese franc (CDF). */
  | 'CDF'
  /** Swiss Francs (CHF). */
  | 'CHF'
  /** Chilean Peso (CLP). */
  | 'CLP'
  /** Chinese Yuan Renminbi (CNY). */
  | 'CNY'
  /** Colombian Peso (COP). */
  | 'COP'
  /** Costa Rican Colones (CRC). */
  | 'CRC'
  /** Cape Verdean escudo (CVE). */
  | 'CVE'
  /** Czech Koruny (CZK). */
  | 'CZK'
  /** Djiboutian Franc (DJF). */
  | 'DJF'
  /** Danish Kroner (DKK). */
  | 'DKK'
  /** Dominican Peso (DOP). */
  | 'DOP'
  /** Algerian Dinar (DZD). */
  | 'DZD'
  /** Egyptian Pound (EGP). */
  | 'EGP'
  /** Eritrean Nakfa (ERN). */
  | 'ERN'
  /** Ethiopian Birr (ETB). */
  | 'ETB'
  /** Euro (EUR). */
  | 'EUR'
  /** Fijian Dollars (FJD). */
  | 'FJD'
  /** Falkland Islands Pounds (FKP). */
  | 'FKP'
  /** United Kingdom Pounds (GBP). */
  | 'GBP'
  /** Georgian Lari (GEL). */
  | 'GEL'
  /** Ghanaian Cedi (GHS). */
  | 'GHS'
  /** Gibraltar Pounds (GIP). */
  | 'GIP'
  /** Gambian Dalasi (GMD). */
  | 'GMD'
  /** Guinean Franc (GNF). */
  | 'GNF'
  /** Guatemalan Quetzal (GTQ). */
  | 'GTQ'
  /** Guyanese Dollar (GYD). */
  | 'GYD'
  /** Hong Kong Dollars (HKD). */
  | 'HKD'
  /** Honduran Lempira (HNL). */
  | 'HNL'
  /** Croatian Kuna (HRK). */
  | 'HRK'
  /** Haitian Gourde (HTG). */
  | 'HTG'
  /** Hungarian Forint (HUF). */
  | 'HUF'
  /** Indonesian Rupiah (IDR). */
  | 'IDR'
  /** Israeli New Shekel (NIS). */
  | 'ILS'
  /** Indian Rupees (INR). */
  | 'INR'
  /** Iraqi Dinar (IQD). */
  | 'IQD'
  /** Iranian Rial (IRR). */
  | 'IRR'
  /** Icelandic Kronur (ISK). */
  | 'ISK'
  /** Jersey Pound. */
  | 'JEP'
  /** Jamaican Dollars (JMD). */
  | 'JMD'
  /** Jordanian Dinar (JOD). */
  | 'JOD'
  /** Japanese Yen (JPY). */
  | 'JPY'
  /** Kenyan Shilling (KES). */
  | 'KES'
  /** Kyrgyzstani Som (KGS). */
  | 'KGS'
  /** Cambodian Riel. */
  | 'KHR'
  /** Kiribati Dollar (KID). */
  | 'KID'
  /** Comorian Franc (KMF). */
  | 'KMF'
  /** South Korean Won (KRW). */
  | 'KRW'
  /** Kuwaiti Dinar (KWD). */
  | 'KWD'
  /** Cayman Dollars (KYD). */
  | 'KYD'
  /** Kazakhstani Tenge (KZT). */
  | 'KZT'
  /** Laotian Kip (LAK). */
  | 'LAK'
  /** Lebanese Pounds (LBP). */
  | 'LBP'
  /** Sri Lankan Rupees (LKR). */
  | 'LKR'
  /** Liberian Dollar (LRD). */
  | 'LRD'
  /** Lesotho Loti (LSL). */
  | 'LSL'
  /** Lithuanian Litai (LTL). */
  | 'LTL'
  /** Latvian Lati (LVL). */
  | 'LVL'
  /** Libyan Dinar (LYD). */
  | 'LYD'
  /** Moroccan Dirham. */
  | 'MAD'
  /** Moldovan Leu (MDL). */
  | 'MDL'
  /** Malagasy Ariary (MGA). */
  | 'MGA'
  /** Macedonia Denar (MKD). */
  | 'MKD'
  /** Burmese Kyat (MMK). */
  | 'MMK'
  /** Mongolian Tugrik. */
  | 'MNT'
  /** Macanese Pataca (MOP). */
  | 'MOP'
  /** Mauritanian Ouguiya (MRU). */
  | 'MRU'
  /** Mauritian Rupee (MUR). */
  | 'MUR'
  /** Maldivian Rufiyaa (MVR). */
  | 'MVR'
  /** Malawian Kwacha (MWK). */
  | 'MWK'
  /** Mexican Pesos (MXN). */
  | 'MXN'
  /** Malaysian Ringgits (MYR). */
  | 'MYR'
  /** Mozambican Metical. */
  | 'MZN'
  /** Namibian Dollar. */
  | 'NAD'
  /** Nigerian Naira (NGN). */
  | 'NGN'
  /** Nicaraguan Córdoba (NIO). */
  | 'NIO'
  /** Norwegian Kroner (NOK). */
  | 'NOK'
  /** Nepalese Rupee (NPR). */
  | 'NPR'
  /** New Zealand Dollars (NZD). */
  | 'NZD'
  /** Omani Rial (OMR). */
  | 'OMR'
  /** Panamian Balboa (PAB). */
  | 'PAB'
  /** Peruvian Nuevo Sol (PEN). */
  | 'PEN'
  /** Papua New Guinean Kina (PGK). */
  | 'PGK'
  /** Philippine Peso (PHP). */
  | 'PHP'
  /** Pakistani Rupee (PKR). */
  | 'PKR'
  /** Polish Zlotych (PLN). */
  | 'PLN'
  /** Paraguayan Guarani (PYG). */
  | 'PYG'
  /** Qatari Rial (QAR). */
  | 'QAR'
  /** Romanian Lei (RON). */
  | 'RON'
  /** Serbian dinar (RSD). */
  | 'RSD'
  /** Russian Rubles (RUB). */
  | 'RUB'
  /** Rwandan Franc (RWF). */
  | 'RWF'
  /** Saudi Riyal (SAR). */
  | 'SAR'
  /** Solomon Islands Dollar (SBD). */
  | 'SBD'
  /** Seychellois Rupee (SCR). */
  | 'SCR'
  /** Sudanese Pound (SDG). */
  | 'SDG'
  /** Swedish Kronor (SEK). */
  | 'SEK'
  /** Singapore Dollars (SGD). */
  | 'SGD'
  /** Saint Helena Pounds (SHP). */
  | 'SHP'
  /** Sierra Leonean Leone (SLL). */
  | 'SLL'
  /** Somali Shilling (SOS). */
  | 'SOS'
  /** Surinamese Dollar (SRD). */
  | 'SRD'
  /** South Sudanese Pound (SSP). */
  | 'SSP'
  /** Sao Tome And Principe Dobra (STD). */
  | 'STD'
  /** Sao Tome And Principe Dobra (STN). */
  | 'STN'
  /** Syrian Pound (SYP). */
  | 'SYP'
  /** Swazi Lilangeni (SZL). */
  | 'SZL'
  /** Thai baht (THB). */
  | 'THB'
  /** Tajikistani Somoni (TJS). */
  | 'TJS'
  /** Turkmenistani Manat (TMT). */
  | 'TMT'
  /** Tunisian Dinar (TND). */
  | 'TND'
  /** Tongan Pa'anga (TOP). */
  | 'TOP'
  /** Turkish Lira (TRY). */
  | 'TRY'
  /** Trinidad and Tobago Dollars (TTD). */
  | 'TTD'
  /** Taiwan Dollars (TWD). */
  | 'TWD'
  /** Tanzanian Shilling (TZS). */
  | 'TZS'
  /** Ukrainian Hryvnia (UAH). */
  | 'UAH'
  /** Ugandan Shilling (UGX). */
  | 'UGX'
  /** United States Dollars (USD). */
  | 'USD'
  /** Uruguayan Pesos (UYU). */
  | 'UYU'
  /** Uzbekistan som (UZS). */
  | 'UZS'
  /** Venezuelan Bolivares (VED). */
  | 'VED'
  /** Venezuelan Bolivares (VEF). */
  | 'VEF'
  /** Venezuelan Bolivares Soberanos (VES). */
  | 'VES'
  /** Vietnamese đồng (VND). */
  | 'VND'
  /** Vanuatu Vatu (VUV). */
  | 'VUV'
  /** Samoan Tala (WST). */
  | 'WST'
  /** Central African CFA Franc (XAF). */
  | 'XAF'
  /** East Caribbean Dollar (XCD). */
  | 'XCD'
  /** Caribbean Guilder (XCG). */
  | 'XCG'
  /** West African CFA franc (XOF). */
  | 'XOF'
  /** CFP Franc (XPF). */
  | 'XPF'
  /** Unrecognized currency. */
  | 'XXX'
  /** Yemeni Rial (YER). */
  | 'YER'
  /** South African Rand (ZAR). */
  | 'ZAR'
  /** Zambian Kwacha (ZMW). */
  | 'ZMW';

/**
 * The input fields for authenticating a customer with email and password. Used by the [`customerAccessTokenCreate`](https://shopify.dev/docs/api/storefront/current/mutations/customerAccessTokenCreate)
 * mutation to generate a [`CustomerAccessToken`](https://shopify.dev/docs/api/storefront/current/objects/CustomerAccessToken),
 * which is required to read or modify customer data.
 */
export type CustomerAccessTokenCreateInput = {
  /** The email associated to the customer. */
  email: string;
  /** The login password to be used by the customer. */
  password: string;
};

/**
 * The input fields for creating a new
 * [`Customer`](https://shopify.dev/docs/api/storefront/current/objects/Customer)
 * account. Used by the [`customerCreate`](https://shopify.dev/docs/api/storefront/current/mutations/customerCreate) mutation.
 *
 * For legacy customer accounts only and requires an email address and password.
 * Optionally accepts the customer's name, phone number, and email marketing consent.
 *
 * > Caution:
 * > The password is used for customer authentication. Ensure it's transmitted
 * securely and never logged or stored in plain text.
 */
export type CustomerCreateInput = {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: boolean | null | undefined;
  /** The customer’s email. */
  email: string;
  /** The customer’s first name. */
  firstName?: string | null | undefined;
  /** The customer’s last name. */
  lastName?: string | null | undefined;
  /** The login password used by the customer. */
  password: string;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: string | null | undefined;
};

/**
 * Controls how delivery addresses are validated during cart operations. The
 * default validation checks only the country code, while strict validation
 * verifies all address fields against Shopify's checkout rules and rejects invalid addresses.
 *
 * Used by [`DeliveryAddressInput`](https://shopify.dev/docs/api/storefront/current/input-objects/DeliveryAddressInput) when setting buyer identity preferences, and by [`CartSelectableAddressInput`](https://shopify.dev/docs/api/storefront/current/input-objects/CartSelectableAddressInput) and [`CartSelectableAddressUpdateInput`](https://shopify.dev/docs/api/storefront/current/input-objects/CartSelectableAddressUpdateInput)
 * when managing cart delivery addresses.
 */
export type DeliveryAddressValidationStrategy =
  /** Only the country code is validated. */
  | 'COUNTRY_CODE_ONLY'
  /**
   * Strict validation is performed, i.e. all fields in the address are validated
   * according to Shopify's checkout rules. If the address fails validation, the cart will not be updated.
   */
  | 'STRICT';

/** Represents the order's current financial status. */
export type OrderFinancialStatus =
  /** Displayed as **Authorized**. */
  | 'AUTHORIZED'
  /** Displayed as **Expired**. */
  | 'EXPIRED'
  /** Displayed as **Paid**. */
  | 'PAID'
  /** Displayed as **Partially paid**. */
  | 'PARTIALLY_PAID'
  /** Displayed as **Partially refunded**. */
  | 'PARTIALLY_REFUNDED'
  /** Displayed as **Pending**. */
  | 'PENDING'
  /** Displayed as **Refunded**. */
  | 'REFUNDED'
  /** Displayed as **Voided**. */
  | 'VOIDED';

/**
 * The aggregated fulfillment status of an
 * [`Order`](https://shopify.dev/docs/api/storefront/current/objects/Order),
 * summarizing the state of all line items. Used for display purposes.
 *
 * Statuses range from unfulfilled to fully fulfilled, with intermediate states such as in progress and on hold.
 *
 * Learn more about [order statuses](https://help.shopify.com/manual/fulfillment/managing-orders/order-status).
 */
export type OrderFulfillmentStatus =
  /** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
  | 'FULFILLED'
  /**
   * Displayed as **In progress**. Some of the items in the order have been
   * fulfilled, or a request for fulfillment has been sent to the fulfillment service.
   */
  | 'IN_PROGRESS'
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  | 'ON_HOLD'
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  | 'OPEN'
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  | 'PARTIALLY_FULFILLED'
  /**
   * Displayed as **Pending fulfillment**. A request for fulfillment of some items
   * awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status.
   */
  | 'PENDING_FULFILLMENT'
  /** Displayed as **Ready for delivery**. */
  | 'READY_FOR_DELIVERY'
  /** Displayed as **Ready for pickup**. */
  | 'READY_FOR_PICKUP'
  /** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
  | 'RESTOCKED'
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  | 'SCHEDULED'
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  | 'UNFULFILLED';

/** The preferred delivery methods such as shipping, local pickup or through pickup points. */
export type PreferenceDeliveryMethodType =
  /** A delivery method used to let buyers collect purchases at designated locations like parcel lockers. */
  | 'PICKUP_POINT'
  /** A delivery method used to let buyers receive items directly from a specific location within an area. */
  | 'PICK_UP'
  /** A delivery method used to send items directly to a buyer’s specified address. */
  | 'SHIPPING';

export type CartQueryVariables = Exact<{
  id: string | number;
}>;


export type CartQuery = { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
        | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
        | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
      > } } | null };

export type CartCreateMutationVariables = Exact<{
  input: CartInput;
}>;


export type CartCreateMutation = { cartCreate: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
        > } } | null, userErrors: Array<{ message: string }> } | null };

export type CartLinesAddMutationVariables = Exact<{
  cartId: string | number;
  lines: Array<CartLineInput> | CartLineInput;
}>;


export type CartLinesAddMutation = { cartLinesAdd: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
        > } } | null, userErrors: Array<{ message: string }> } | null };

export type CartLinesUpdateMutationVariables = Exact<{
  cartId: string | number;
  lines: Array<CartLineUpdateInput> | CartLineUpdateInput;
}>;


export type CartLinesUpdateMutation = { cartLinesUpdate: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
        > } } | null, userErrors: Array<{ message: string }> } | null };

export type CartLinesRemoveMutationVariables = Exact<{
  cartId: string | number;
  lineIds: Array<string | number> | string | number;
}>;


export type CartLinesRemoveMutation = { cartLinesRemove: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
        > } } | null, userErrors: Array<{ message: string }> } | null };

export type CartBuyerIdentityUpdateMutationVariables = Exact<{
  cartId: string | number;
  buyerIdentity: CartBuyerIdentityInput;
}>;


export type CartBuyerIdentityUpdateMutation = { cartBuyerIdentityUpdate: { cart: { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
          | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
        > } } | null, userErrors: Array<{ message: string }> } | null };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { shop: { name: string }, collections: { nodes: Array<{ id: string, handle: string, title: string, image: { url: string, altText: string | null } | null }> }, products: { nodes: Array<{ id: string, handle: string, title: string, availableForSale: boolean, featuredImage: { url: string, altText: string | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } }> } };

export type CollectionsQueryVariables = Exact<{
  cursor?: string | null | undefined;
}>;


export type CollectionsQuery = { collections: { nodes: Array<{ id: string, handle: string, title: string, image: { url: string, altText: string | null } | null }>, pageInfo: { hasNextPage: boolean, endCursor: string | null } } };

export type CollectionQueryVariables = Exact<{
  handle: string;
  cursor?: string | null | undefined;
}>;


export type CollectionQuery = { collection: { id: string, title: string, description: string, products: { nodes: Array<{ id: string, handle: string, title: string, availableForSale: boolean, featuredImage: { url: string, altText: string | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } }>, pageInfo: { hasNextPage: boolean, endCursor: string | null } } } | null };

export type ProductQueryVariables = Exact<{
  handle: string;
}>;


export type ProductQuery = { product: { id: string, handle: string, title: string, description: string, vendor: string, availableForSale: boolean, images: { nodes: Array<{ id: string | null, url: string, altText: string | null }> }, options: Array<{ name: string, optionValues: Array<{ name: string }> }>, variants: { nodes: Array<{ id: string, title: string, availableForSale: boolean, selectedOptions: Array<{ name: string, value: string }>, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice: { amount: string, currencyCode: CurrencyCode } | null, image: { url: string, altText: string | null } | null }> } } | null };

export type SearchQueryVariables = Exact<{
  query: string;
  cursor?: string | null | undefined;
}>;


export type SearchQuery = { products: { nodes: Array<{ id: string, handle: string, title: string, availableForSale: boolean, featuredImage: { url: string, altText: string | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } }>, pageInfo: { hasNextPage: boolean, endCursor: string | null } } };

export type CustomerCreateMutationVariables = Exact<{
  input: CustomerCreateInput;
}>;


export type CustomerCreateMutation = { customerCreate: { customer: { id: string } | null, customerUserErrors: Array<{ field: Array<string> | null, message: string }> } | null };

export type CustomerAccessTokenCreateMutationVariables = Exact<{
  input: CustomerAccessTokenCreateInput;
}>;


export type CustomerAccessTokenCreateMutation = { customerAccessTokenCreate: { customerAccessToken: { accessToken: string, expiresAt: string } | null, customerUserErrors: Array<{ field: Array<string> | null, message: string }> } | null };

export type CustomerAccessTokenDeleteMutationVariables = Exact<{
  token: string;
}>;


export type CustomerAccessTokenDeleteMutation = { customerAccessTokenDelete: { deletedAccessToken: string | null } | null };

export type CustomerQueryVariables = Exact<{
  token: string;
}>;


export type CustomerQuery = { customer: { id: string, firstName: string | null, lastName: string | null, email: string | null, orders: { nodes: Array<{ id: string, name: string, processedAt: string, financialStatus: OrderFinancialStatus | null, fulfillmentStatus: OrderFulfillmentStatus, statusUrl: string, subtotalPrice: { amount: string, currencyCode: CurrencyCode } | null, totalShippingPrice: { amount: string, currencyCode: CurrencyCode }, totalTax: { amount: string, currencyCode: CurrencyCode } | null, totalPrice: { amount: string, currencyCode: CurrencyCode }, shippingAddress: { name: string | null, formatted: Array<string> } | null, lineItems: { nodes: Array<{ title: string, quantity: number, variant: { id: string, title: string, image: { url: string, altText: string | null } | null } | null, originalTotalPrice: { amount: string, currencyCode: CurrencyCode } }> } }> } } | null };

export type ProductCardFragment = { id: string, handle: string, title: string, availableForSale: boolean, featuredImage: { url: string, altText: string | null } | null, priceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } }, compareAtPriceRange: { minVariantPrice: { amount: string, currencyCode: CurrencyCode } } };

export type CartFieldsFragment = { id: string, checkoutUrl: string, totalQuantity: number, cost: { subtotalAmount: { amount: string, currencyCode: CurrencyCode }, totalAmount: { amount: string, currencyCode: CurrencyCode } }, lines: { nodes: Array<
      | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
      | { id: string, quantity: number, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode } }, merchandise: { id: string, title: string, image: { url: string, altText: string | null } | null, price: { amount: string, currencyCode: CurrencyCode }, product: { handle: string, title: string } } }
    > } };

export type OrderFieldsFragment = { id: string, name: string, processedAt: string, financialStatus: OrderFinancialStatus | null, fulfillmentStatus: OrderFulfillmentStatus, statusUrl: string, subtotalPrice: { amount: string, currencyCode: CurrencyCode } | null, totalShippingPrice: { amount: string, currencyCode: CurrencyCode }, totalTax: { amount: string, currencyCode: CurrencyCode } | null, totalPrice: { amount: string, currencyCode: CurrencyCode }, shippingAddress: { name: string | null, formatted: Array<string> } | null, lineItems: { nodes: Array<{ title: string, quantity: number, variant: { id: string, title: string, image: { url: string, altText: string | null } | null } | null, originalTotalPrice: { amount: string, currencyCode: CurrencyCode } }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ProductCardFragmentDoc = new TypedDocumentString(`
    fragment ProductCard on Product {
  id
  handle
  title
  availableForSale
  featuredImage {
    url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })
    altText
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
}
    `, {"fragmentName":"ProductCard"}) as unknown as TypedDocumentString<ProductCardFragment, unknown>;
export const CartFieldsFragmentDoc = new TypedDocumentString(`
    fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}
    `, {"fragmentName":"CartFields"}) as unknown as TypedDocumentString<CartFieldsFragment, unknown>;
export const OrderFieldsFragmentDoc = new TypedDocumentString(`
    fragment OrderFields on Order {
  id
  name
  processedAt
  financialStatus
  fulfillmentStatus
  statusUrl
  subtotalPrice {
    amount
    currencyCode
  }
  totalShippingPrice {
    amount
    currencyCode
  }
  totalTax {
    amount
    currencyCode
  }
  totalPrice {
    amount
    currencyCode
  }
  shippingAddress {
    name
    formatted
  }
  lineItems(first: 50) {
    nodes {
      title
      quantity
      variant {
        id
        title
        image {
          url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
          altText
        }
      }
      originalTotalPrice {
        amount
        currencyCode
      }
    }
  }
}
    `, {"fragmentName":"OrderFields"}) as unknown as TypedDocumentString<OrderFieldsFragment, unknown>;
export const CartDocument = new TypedDocumentString(`
    query Cart($id: ID!) {
  cart(id: $id) {
    ...CartFields
  }
}
    fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}`) as unknown as TypedDocumentString<CartQuery, CartQueryVariables>;
export const CartCreateDocument = new TypedDocumentString(`
    mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      ...CartFields
    }
    userErrors {
      message
    }
  }
}
    fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}`) as unknown as TypedDocumentString<CartCreateMutation, CartCreateMutationVariables>;
export const CartLinesAddDocument = new TypedDocumentString(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFields
    }
    userErrors {
      message
    }
  }
}
    fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}`) as unknown as TypedDocumentString<CartLinesAddMutation, CartLinesAddMutationVariables>;
export const CartLinesUpdateDocument = new TypedDocumentString(`
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFields
    }
    userErrors {
      message
    }
  }
}
    fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}`) as unknown as TypedDocumentString<CartLinesUpdateMutation, CartLinesUpdateMutationVariables>;
export const CartLinesRemoveDocument = new TypedDocumentString(`
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...CartFields
    }
    userErrors {
      message
    }
  }
}
    fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}`) as unknown as TypedDocumentString<CartLinesRemoveMutation, CartLinesRemoveMutationVariables>;
export const CartBuyerIdentityUpdateDocument = new TypedDocumentString(`
    mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
    cart {
      ...CartFields
    }
    userErrors {
      message
    }
  }
}
    fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          image {
            url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
            altText
          }
          price {
            amount
            currencyCode
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}`) as unknown as TypedDocumentString<CartBuyerIdentityUpdateMutation, CartBuyerIdentityUpdateMutationVariables>;
export const HomeDocument = new TypedDocumentString(`
    query Home {
  shop {
    name
  }
  collections(first: 8) {
    nodes {
      id
      handle
      title
      image {
        url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })
        altText
      }
    }
  }
  products(first: 10, sortKey: BEST_SELLING) {
    nodes {
      ...ProductCard
    }
  }
}
    fragment ProductCard on Product {
  id
  handle
  title
  availableForSale
  featuredImage {
    url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })
    altText
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
}`) as unknown as TypedDocumentString<HomeQuery, HomeQueryVariables>;
export const CollectionsDocument = new TypedDocumentString(`
    query Collections($cursor: String) {
  collections(first: 20, after: $cursor) {
    nodes {
      id
      handle
      title
      image {
        url(transform: { maxWidth: 600, maxHeight: 400, crop: CENTER })
        altText
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionsQuery, CollectionsQueryVariables>;
export const CollectionDocument = new TypedDocumentString(`
    query Collection($handle: String!, $cursor: String) {
  collection(handle: $handle) {
    id
    title
    description
    products(first: 12, after: $cursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
    fragment ProductCard on Product {
  id
  handle
  title
  availableForSale
  featuredImage {
    url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })
    altText
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
}`) as unknown as TypedDocumentString<CollectionQuery, CollectionQueryVariables>;
export const ProductDocument = new TypedDocumentString(`
    query Product($handle: String!) {
  product(handle: $handle) {
    id
    handle
    title
    description
    vendor
    availableForSale
    images(first: 8) {
      nodes {
        id
        url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })
        altText
      }
    }
    options {
      name
      optionValues {
        name
      }
    }
    variants(first: 100) {
      nodes {
        id
        title
        availableForSale
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        image {
          url(transform: { maxWidth: 1080, maxHeight: 1080, crop: CENTER })
          altText
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductQuery, ProductQueryVariables>;
export const SearchDocument = new TypedDocumentString(`
    query Search($query: String!, $cursor: String) {
  products(first: 20, after: $cursor, query: $query) {
    nodes {
      ...ProductCard
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    fragment ProductCard on Product {
  id
  handle
  title
  availableForSale
  featuredImage {
    url(transform: { maxWidth: 480, maxHeight: 480, crop: CENTER })
    altText
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
}`) as unknown as TypedDocumentString<SearchQuery, SearchQueryVariables>;
export const CustomerCreateDocument = new TypedDocumentString(`
    mutation CustomerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
    }
    customerUserErrors {
      field
      message
    }
  }
}
    `) as unknown as TypedDocumentString<CustomerCreateMutation, CustomerCreateMutationVariables>;
export const CustomerAccessTokenCreateDocument = new TypedDocumentString(`
    mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      field
      message
    }
  }
}
    `) as unknown as TypedDocumentString<CustomerAccessTokenCreateMutation, CustomerAccessTokenCreateMutationVariables>;
export const CustomerAccessTokenDeleteDocument = new TypedDocumentString(`
    mutation CustomerAccessTokenDelete($token: String!) {
  customerAccessTokenDelete(customerAccessToken: $token) {
    deletedAccessToken
  }
}
    `) as unknown as TypedDocumentString<CustomerAccessTokenDeleteMutation, CustomerAccessTokenDeleteMutationVariables>;
export const CustomerDocument = new TypedDocumentString(`
    query Customer($token: String!) {
  customer(customerAccessToken: $token) {
    id
    firstName
    lastName
    email
    orders(first: 30, sortKey: PROCESSED_AT, reverse: true) {
      nodes {
        ...OrderFields
      }
    }
  }
}
    fragment OrderFields on Order {
  id
  name
  processedAt
  financialStatus
  fulfillmentStatus
  statusUrl
  subtotalPrice {
    amount
    currencyCode
  }
  totalShippingPrice {
    amount
    currencyCode
  }
  totalTax {
    amount
    currencyCode
  }
  totalPrice {
    amount
    currencyCode
  }
  shippingAddress {
    name
    formatted
  }
  lineItems(first: 50) {
    nodes {
      title
      quantity
      variant {
        id
        title
        image {
          url(transform: { maxWidth: 200, maxHeight: 200, crop: CENTER })
          altText
        }
      }
      originalTotalPrice {
        amount
        currencyCode
      }
    }
  }
}`) as unknown as TypedDocumentString<CustomerQuery, CustomerQueryVariables>;