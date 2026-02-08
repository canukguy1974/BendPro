# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the Python modules. Key areas include `src/core/` (LLM clients and base classes), `src/processing/` (chunking/tokenization), `src/prompts/` (prompt templates/chains), `src/inference/` (response parsing/engine), and `src/rag/` (embedding/retrieval/indexing).
- `config/` stores runtime configuration such as `model_config.yaml` and `logging_config.yaml`.
- `data/` is reserved for local datasets/artifacts generated during experiments; keep large or sensitive files out of git.
- `scripts/` is the home for repo utilities (currently placeholders).
- `docs/` contains project documentation; expand `docs/README.md` and `docs/SETUP.md` as features land.
- `Dockerfile` and `docker-compose.yml` provide container entry points.

## Build, Test, and Development Commands
- `python -m pip install -r requirements.txt` installs dependencies (currently an empty requirements file).
- `bash scripts/setup_env.sh` is the intended environment bootstrap script (populate as needed).
- `bash scripts/run_tests.sh` is the intended test runner entry point (populate as needed).
- `python scripts/build_embeddings.py` and `python scripts/cleanup.py` are placeholders for data/index workflows.

## Coding Style & Naming Conventions
- Python style: 4-space indentation, `snake_case` for functions/variables, `PascalCase` for classes.
- Prefer small modules with clear boundaries (core vs. processing vs. rag).
- Keep configuration in `config/` and load it rather than hard-coding constants.

## Testing Guidelines
- No test suite is wired yet. When adding tests, create a top-level `tests/` directory and document the runner in `scripts/run_tests.sh`.
- Use descriptive test names (e.g., `tests/test_retriever.py`) and keep fixtures close to the tests they support.

## Commit & Pull Request Guidelines
- This repository has no recorded git history. Use clear, imperative commit messages (e.g., "Add retriever caching") and keep commits scoped.
- PRs should include a short description, linked issues (if any), and notes on config changes or new scripts.

## Security & Configuration Tips
- Do not commit secrets. Keep API keys in local environment variables and reference them in `config/`.
- If you introduce new config fields, update `config/model_config.yaml` and document them in `docs/`.

## Next Best Action
- Run `npm install` and `npm run dev`, then review the new glassmorphism UI and confirm which panels/flows should be wired next (template CRUD, upload preview, or bend-sheet export).
