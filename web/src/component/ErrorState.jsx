import React from 'react'

function ErrorState({ message }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4 text-center">
            <div className="text-error text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-error mb-2">Oops!</h2>
            <p className="text-base-content/70 mb-6">{message}</p>
            <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
            >
                Try Again
            </button>
        </div>
    )
}

export default ErrorState