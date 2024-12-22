export function transformAggregation(input: any, oldSchema: any) {

    const newAggregations = input.map((item: any) => ({
        column: item.field,
        aggregate: item.aggregation,
    }));

    const newFields = oldSchema.map((item: any) => ({
        name: item.name,
        type: item.type
    }));

    newAggregations.forEach((agg: any) => {
        const newColumnName = `${agg.column}_${agg.aggregate}`;
        if (!newFields.some((field: any) => field.name === newColumnName)) {
            newFields.push({
                name: newColumnName,
                type: 'double',
                nullable: true,
                metadata: {}
            });
        }
    });

    return {
        options: {
            streaming: {
                timestampCol: "EntryTime", // Adjust this as needed
                aggregations: newAggregations
            }
        },
        schema: {
            fields: newFields
        }
    };
}

export function reverseTransformAggregation(transformed: any) {
    const { options: { streaming: { aggregations } }, schema:  { fields } } = transformed;

    const input = aggregations.map((agg: any) => {
        const [field, aggregate] = agg.column.split('_');
        return {
            aggregation: agg.aggregate,
            field,
        };
    });

    const oldSchema = fields.filter((field: any) => !field.name.includes('_')).map((field: any) => ({
        name: field.name,
        type: field.type
    }));

    return { input, oldSchema };
}

// Example usage:
// const input = [
//     { aggregation: "average", field: "tes", filterBy: "tes", timeUnit: "Second", timeValue: 5 },
//     { aggregation: "max", field: "tes", filterBy: "tes", timeUnit: "Second", timeValue: 5 }
// ];
// const oldSchema = [
//     { name: "TollId", type: "integer" },
//     { name: "EntryTime", type: "timestamp" },
//     { name: "LicensePlate", type: "string" },
//     { name: "VehicleClass", type: "string" },
//     { name: "Toll", type: "double" }
// ];
// const result = transformAggregation(input, oldSchema);
// console.log(result);
// const reversed = reverseTransformAggregation(result);
// console.log(reversed);
