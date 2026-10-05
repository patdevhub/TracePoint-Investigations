# TracePoint Investigations — testing and demo

TracePoint is an academic investigation workspace built with React, ASP.NET Core, Entity Framework Core, Dapper and SQL Server. Users review a case, compare suspects, examine evidence and submit an investigation conclusion.

## Verified results

The following runs were reported from the working Windows project on **5 October 2026**:

| Check | Passed | Failed | What it establishes |
|---|---:|---:|---|
| Frontend validation unit tests | 4 | 0 | Required case and suspect selection, required conclusion, and valid form input |
| Real API/database integration test | 1 | 0 | Validation responses, database storage, and retrieval through EF Core and Dapper |

The React application also submitted investigation **#8**, which appeared in the backend's investigation list with the same saved conclusion. This manual check demonstrates the browser-to-API workflow. The automated integration test separately verifies the API-to-database workflow.

### Frontend tests

Run inside `TracePointClient`:

```powershell
npm test
```

The four tests exercise the validation function used by the React form:

1. A suspect must be selected.
2. An empty or whitespace-only conclusion is rejected.
3. Valid investigation input passes validation.
4. A case loaded from the API is required.

Recorded result: **4 tests passed, 0 failed**.

### API/database integration test

Keep TracePointAPI running. The test file currently sits directly inside `TracePointAPI`; run from that folder:

```powershell
node --test .\api.integration.test.mjs
```

The default target is `https://localhost:7200/api`. To change it:

```powershell
$env:TEST_API_URL = "https://localhost:7200/api"
node --test .\api.integration.test.mjs
```

The test obtains actual case and suspect IDs from the running API. It then verifies:

- Unknown case/suspect IDs and a whitespace conclusion return HTTP 400.
- A valid submission returns HTTP 201, a generated investigation ID and a Location header pointing to that investigation.
- `GET /api/investigations/{id}` retrieves the saved case ID, suspect ID and conclusion through EF Core.
- `GET /api/investigations` retrieves that same record through the Dapper join, including its matching suspect name.

Recorded result: **1 test passed, 0 failed**. Each successful run leaves one clearly labelled integration-test record in the database.

If the file is moved into a `Tests` folder for the final package, use `node --test .\Tests\api.integration.test.mjs` instead.

## Five-minute demonstration

1. Start TracePointAPI in Visual Studio and open `https://localhost:7200/swagger`.
2. Start React with `npm run dev` in `TracePointClient`, then open `http://127.0.0.1:5173`.
3. Open the case, suspects and evidence pages. Explain that the records come from API requests. Open an evidence detail and show the examined marker.
4. Select a suspect and write a conclusion that refers to that same suspect. For example, select **Jamie Smith** and explain that the security access log records Jamie's card at 23:41, while the unclear CCTV means further investigation is needed.
5. Open Chrome DevTools → Network → Fetch/XHR. Submit the form and show the `POST /api/investigations` request, its case/suspect IDs and conclusion, and its HTTP 201 response with the new investigation ID.
6. Execute `GET /api/investigations` in Swagger. Find the new ID and compare the suspect name and exact conclusion with the browser submission. This independent retrieval is the evidence that the record was saved.
7. Show the unit-test and integration-test outputs. Resize the browser to demonstrate the responsive navigation and cards.

The browser's development requests may show port **5173** because Vite forwards `/api` requests to the backend on port **7200**.

## Code to explain during the demo

- **Props:** `CaseCard`, `SuspectCard` and `EvidenceCard` receive their record data through props.
- **React state:** the selected suspect, conclusion, evidence selection and API loading/error states support the investigation workflow.
- **EF Core:** the controller validates the submitted IDs and conclusion, adds the investigation and calls `SaveChangesAsync`.
- **Dapper:** the investigation list joins `Investigations` to `Suspects` to return the suspect name with each saved conclusion.
- **Validation:** the form handles missing input before submission, and the API independently rejects invalid requests.

## Verification scope

The four frontend unit tests cover form validation logic. The API integration test uses the real running API and its configured database. Browser submissions were checked manually. A publicly deployed version has not been verified.
