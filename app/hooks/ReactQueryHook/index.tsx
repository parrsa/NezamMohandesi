// import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
// import { ReactQueryProps } from "./type";

// const isMutation = (result: any): result is UseMutationResult<any, any, any, any> => {
//     return typeof result.mutate === "function";
// };

// const ReactQuery = <T,>({ queryResult, render, ...props }: ReactQueryProps<T>) => {
//     if (isMutation(queryResult)) {
//         const { data, isError, isPending, isSuccess } = queryResult;

//         if (isPending) {
//             return props.renderLoading ? props.renderLoading : <p>Sending...</p>;
//         }

//         if (isError) {
//             return props.renderError ? props.renderError : <p>Post Error</p>;
//         }

//         if (isSuccess && data) {
//             return render(data);
//         }

//         return "Something went wrong with the mutation.";
//     } else {
//         const { data, isLoading = false, isFetching = false, isError = false, isSuccess = false } =
//             queryResult as UseQueryResult<any, any>;

//         if (isLoading || isFetching) {
//             return props.renderLoading ? props.renderLoading : <p>Loading...</p>;
//         }

//         if (isError) {
//             return props.renderError ? props.renderError : <p>Error</p>;
//         }

//         if (isSuccess && data) {
//             return render(data);
//         }

//         return "Something went wrong with the query.";
//     }
// };

// export default ReactQuery;
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { ReactQueryProps } from "./type";

const isMutation = (result: any): result is UseMutationResult<any, any, any, any> => {
    return result && typeof result.mutate === "function";
};

const ReactQuery = <T,>({ queryResult, render, renderError, renderLoading }: ReactQueryProps<T>) => {
    // Ensure queryResult exists
    if (!queryResult) {
        return renderError ? renderError : <p>Query result is missing.</p>;
    }

    if (isMutation(queryResult)) {
        const { data, isError, isPending, isSuccess } = queryResult;

        if (isPending) {
            return renderLoading ? renderLoading : <p>Sending...</p>;
        }

        if (isError) {
            return renderError ? renderError : <p>Post Error</p>;
        }

        if (isSuccess && data) {
            return render(data);
        }

        return "Something went wrong with the mutation.";
    } else {
        const { data, isLoading = false, isFetching = false, isError = false, isSuccess = false } =
            queryResult as UseQueryResult<any, any>;


        if (isLoading || isFetching) {
            return renderLoading ? renderLoading : <p>Loading...</p>;
        }

        if (isError) {
            return renderError ? renderError : <p>Error</p>;
        }

        if (isSuccess && data) {
            return render(data);
        }

        // return "Something went wrong with the query.";
    }
};

export default ReactQuery;
