import React from "react";

export const Toster = () => {
  return (
    <div>
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          {/* <img src="..." class="rounded mr-2" alt="..." /> */}
          <strong class="mr-auto">Bootstrap</strong>
          <small></small>
          <button
            type="button"
            class="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">Login Failed</div>
      </div>
    </div>
  );
};
