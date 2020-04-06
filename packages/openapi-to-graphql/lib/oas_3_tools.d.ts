/**
 * Utility functions around the OpenAPI Specification 3.
 */
import { Oas2 } from './types/oas2';
import { Operation } from './types/operation';
import { Oas3, ServerObject, ParameterObject, SchemaObject, OperationObject, ResponseObject, PathItemObject, RequestBodyObject, ReferenceObject, LinkObject, CallbackObject, SecuritySchemeObject } from './types/oas3';
import { PreprocessingData, ProcessedSecurityScheme } from './types/preprocessing_data';
import { InternalOptions } from './types/options';
export declare type SchemaNames = {
    fromRef?: string;
    fromSchema?: string;
    fromPath?: string;
    /**
     * Used when the preferred name is known, i.e. a new data def does not need to
     * be created
     */
    preferred?: string;
};
export declare type RequestSchemaAndNames = {
    payloadContentType?: string;
    payloadSchema?: SchemaObject | ReferenceObject;
    payloadSchemaNames?: SchemaNames;
    payloadRequired: boolean;
};
export declare type ResponseSchemaAndNames = {
    responseContentType?: string;
    responseSchema?: SchemaObject | ReferenceObject;
    responseSchemaNames?: SchemaNames;
    statusCode?: string;
};
export declare const OAS_OPERATIONS: string[];
export declare const SUCCESS_STATUS_RX: RegExp;
/**
 * Resolves on a validated OAS 3 for the given spec (OAS 2 or OAS 3), or rejects
 * if errors occur.
 */
export declare function getValidOAS3(spec: Oas2 | Oas3): Promise<Oas3>;
/**
 * Counts the number of operations in an OAS.
 */
export declare function countOperations(oas: Oas3): number;
/**
 * Counts the number of operations that translate to queries in an OAS.
 */
export declare function countOperationsQuery(oas: Oas3): number;
/**
 * Counts the number of operations that translate to mutations in an OAS.
 */
export declare function countOperationsMutation(oas: Oas3): number;
/**
 * Counts the number of operations that translate to subscriptions in an OAS.
 */
export declare function countOperationsSubscription(oas: Oas3): number;
/**
 * Counts the number of operations with a payload definition in an OAS.
 */
export declare function countOperationsWithPayload(oas: Oas3): number;
/**
 * Resolves the given reference in the given object.
 */
export declare function resolveRef(ref: string, oas: Oas3): any;
/**
 * Returns the base URL to use for the given operation.
 */
export declare function getBaseUrl(operation: Operation): string;
/**
 * Returns object/array/scalar where all object keys (if applicable) are
 * sanitized.
 */
export declare function sanitizeObjectKeys(obj: any, // obj does not necessarily need to be an object
caseStyle?: CaseStyle): any;
/**
 * Desanitizes keys in given object by replacing them with the keys stored in
 * the given mapping.
 */
export declare function desanitizeObjectKeys(obj: object | Array<any>, mapping?: object): object | Array<any>;
/**
 * Replaces the path parameter in the given path with values in the given args.
 * Furthermore adds the query parameters for a request.
 */
export declare function instantiatePathAndGetQuery(path: string, parameters: ParameterObject[], args: object, // NOTE: argument keys are sanitized!
data: PreprocessingData): {
    path: string;
    query: {
        [key: string]: string;
    };
    headers: {
        [key: string]: string;
    };
};
/**
 * Returns the GraphQL type that the provided schema should be made into
 *
 * Does not consider allOf, anyOf, oneOf, or not (handled separately)
 */
export declare function getSchemaTargetGraphQLType(schema: SchemaObject, data: PreprocessingData): string | null;
/**
 * Infers a resource name from the given URL path.
 *
 * For example, turns "/users/{userId}/car" into "userCar".
 */
export declare function inferResourceNameFromPath(path: string): string;
/**
 * Returns JSON-compatible schema required by the given operation
 */
export declare function getRequestBodyObject(operation: OperationObject, oas: Oas3): {
    payloadContentType: string;
    requestBodyObject: RequestBodyObject;
} | null;
/**
 * Returns the request schema (if any) for the given operation,
 * a dictionary of names from different sources (if available), and whether the
 * request schema is required for the operation.
 */
export declare function getRequestSchemaAndNames(path: string, method: string, operation: OperationObject, oas: Oas3): RequestSchemaAndNames;
/**
 * Returns JSON-compatible schema produced by the given operation
 */
export declare function getResponseObject(operation: OperationObject, statusCode: string, oas: Oas3): {
    responseContentType: string;
    responseObject: ResponseObject;
} | null;
/**
 * Returns the response schema for the given operation,
 * a successful  status code, and a dictionary of names from different sources
 * (if available).
 */
export declare function getResponseSchemaAndNames(path: string, method: string, operation: OperationObject, oas: Oas3, data: PreprocessingData, options: InternalOptions): ResponseSchemaAndNames;
/**
 * Returns a success status code for the given operation
 */
export declare function getResponseStatusCode(path: string, method: string, operation: OperationObject, oas: Oas3, data: PreprocessingData): string | void;
/**
 * Returns a hash containing the links in the given operation.
 */
export declare function getLinks(path: string, method: string, operation: OperationObject, oas: Oas3, data: PreprocessingData): {
    [key: string]: LinkObject;
};
/**
 * Returns the list of parameters in the given operation.
 */
export declare function getParameters(path: string, method: string, operation: OperationObject, pathItem: PathItemObject, oas: Oas3): ParameterObject[];
/**
 * Returns a hash containing the callbacks in the given operation.
 */
export declare function getCallbacks(operation: OperationObject, oas: Oas3): {
    [key: string]: CallbackObject;
};
/**
 * Returns an array of server objects for the operation at the given path and
 * method. Considers in the following order: global server definitions,
 * definitions at the path item, definitions at the operation, or the OAS
 * default.
 */
export declare function getServers(operation: OperationObject, pathItem: PathItemObject, oas: Oas3): ServerObject[];
/**
 * Returns a map of Security Scheme definitions, identified by keys. Resolves
 * possible references.
 */
export declare function getSecuritySchemes(oas: Oas3): {
    [key: string]: SecuritySchemeObject;
};
/**
 * Returns the list of sanitized keys of non-OAuth2 security schemes
 * required by the operation at the given path and method.
 */
export declare function getSecurityRequirements(operation: OperationObject, securitySchemes: {
    [key: string]: ProcessedSecurityScheme;
}, oas: Oas3): string[];
export declare enum CaseStyle {
    simple = 0,
    PascalCase = 1,
    camelCase = 2,
    ALL_CAPS = 3
}
/**
 * First sanitizes given string and then also camel-cases it.
 */
export declare function sanitize(str: string, caseStyle: CaseStyle): string;
/**
 * Sanitizes the given string and stores the sanitized-to-original mapping in
 * the given mapping.
 */
export declare function storeSaneName(saneStr: string, str: string, mapping: {
    [key: string]: string;
}): string;
/**
 * Stringifies and possibly trims the given string to the provided length.
 */
export declare function trim(str: string, length: number): string;
/**
 * Determines if the given "method" is indeed an operation. Alternatively, the
 * method could point to other types of information (e.g., parameters, servers).
 */
export declare function isOperation(method: string): boolean;
/**
 * Formats a string that describes an operation in the form:
 * {name of OAS} {HTTP method in ALL_CAPS} {operation path}
 *
 * Also used in preprocessing.ts where Operation objects are being constructed
 */
export declare function formatOperationString(method: string, path: string, title?: string): string;
/**
 * Capitalizes a given string
 */
export declare function capitalize(str: string): string;
/**
 * Uncapitalizes a given string
 */
export declare function uncapitalize(str: string): string;
/**
 * For operations that do not have an operationId, generate one
 */
export declare function generateOperationId(method: string, path: string): string;
