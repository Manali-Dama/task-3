export const ProductDropdowns = {
    product_type: [],
    dosage_form: [],
    package_type: [],
    uom: [],
    schedule_type_code: [],
    gst_type: [],
    b2b_category: [],
    sales_trend_category: [],
    product_return_type: [],
    mis_reporting_category: [],
    mis_warehouse_category: []
};

export const form_fields = {
    sections: [
        {
          title: "Header",
          fields: [
            {
              type: "title",
              label: "Add Product",
            },
            {
              type: "button",
              label: "Close",
            },
          ],
        },
        {
            title: "fixed",
            fields: [
                {
                    type: "input",
                    label: "product name",
                    field_key: "product_name",
                    required: true
                },
                {
                    type: "dropdown",
                    label: "product type",
                    field_key: "product_type",
                    required: true
                },
                {
                    type: "input",
                    label: "wondersoft code",
                    field_key: "ws_code",
                    required: true
                },
                {
                    type: "input",
                    label: "product code",
                    field_key: "product_code",
                    required: true
                },
                {
                    type: "dropdown",
                    label: "Manufacturer",
                    field_key:"manufacturer",
                    required: true
                },
                {
                    type: "input",
                    label: "MRP",
                    field_key: "mrp",
                    required: true
                },
            ]
        },
        {
            title: "variable",
            fields: [
                {
                    type: "section",
                    title: "Packaging and Units",
                    fields: [
                        {
                            type: "dropdown",
                            label: "Dosage Form",
                            field_key: "dosage_form",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Package type",
                            field_key: "package_type",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Unit of Measurement",
                            field_key: "uom",
                            required: true
                        },
                        {
                            type: "input",
                            label: "Package Size",
                            field_key: "package_size",
                            required: true
                        }
                    ]
                },
                {
                    type: "section",
                    title: "Molecule Composition",
                    fields: [
                        {
                            type: "checkbox",
                            label: "Molecules",
                            options: "molecules",
                            required: true
                        }
                    ]
                },
                {
                    type: "section",
                    title: "Classification",
                    fields: [
                        {
                            type: "boolean",
                            label: "Is Assured",
                            field_key: "is_assured",
                            required: true
                        },
                        {
                            type: "boolean",
                            label: "Discontinued",
                            field_key: "is_discontinued",
                            required: true
                        },
                        {
                            type: "boolean",
                            label: "Banned",
                            field_key: "banned",
                            required: true
                        },
                        {
                            type: "boolean",
                            label: "Is Active",
                            field_key: "is_active",
                            required: true
                        },
                        {
                            type: "boolean",
                            label: "Is Hidden Fron Alternate",
                            field_key: "is_hidden_from_alternate_products",
                            required: true
                        },
                        {
                            type: "boolean",
                            label: "Rx Required",
                            field_key: "is_rx_required",
                            required: false
                        },
                        {
                            type: "boolean",
                            label: "Can Sell Online",
                            field_key: "can_sell_online",
                            required: false
                        },
                        {
                            type: "boolean",
                            label: "Chronic",
                            field_key: "is_chronic",
                            required: false
                        },
                        {
                            type: "boolean",
                            label: "Refrigerated",
                            field_key: "is_refrigerated",
                            required: false
                        },
                        {
                            type: "input",
                            label: "Sheduled Type code",
                            field_key: "scheduled_type_code",
                            required: false
                        }
                    ]
                },
                {
                    type: "section",
                    "title": "Transaction Units",
                    "fields": [
                        {
                            type: "input",
                            label: "Purchase Unit",
                            options: "purchase_unit",
                            required: true
                        },
                        {
                            type: "input",
                            label: "Transfer Unit",
                            options: "transfer_unit",
                            required: true
                        },
                        {
                            type: "input",
                            label: "Sales Unit",
                            options: "sales_unit",
                            required: true
                        }
                    ]
                },
                {
                    type: "section",
                    "title": "GST Info",
                    "fields": [
                        {
                            type: "dropdown",
                            label: "GST Type",
                            options: "gst_type",
                            required: true
                        },
                        {
                            type: "input",
                            label: "HSN Code",
                            options: "hsn_code",
                            required: true
                        },
                    ]
                },
                {
                    type: "section",
                    "title": "Sales Category",
                    "fields": [
                        {
                            type: "dropdown",
                            label: "B2B Product type",
                            field_key: "b2b_category",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "B2C Product type",
                            field_key: "b2c_category",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "Sales Trend Category",
                            field_key: "sales_trend_category",
                            required: true
                        },
                        {
                            type: "boolean",
                            label: "Return Type",
                            field_key: "is_returnable",
                            required: true
                        }
                    ]
                },
                {
                    type: "section",
                    "title": "MIS Category",
                    "fields": [
                        {
                            type: "dropdown",
                            label: "Reporting Category",
                            field_key: "mis_reporting_category",
                            required: true
                        },
                        {
                            type: "dropdown",
                            label: "WH Category",
                            field_key: "mis_warehouse_category",
                            required: true
                        }
                    ]
                }
            
            ]
        },
        {
            title: "submit",
            fields: [
                {
                    type: "button",
                    label: "save"
                }
            ]
        }
    ]
};