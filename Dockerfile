FROM node:22

RUN npm install -g pnpm@11.25.0

WORKDIR /workspace/

# Dependency manifests first so the install layer survives source-only changes.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 80

CMD ["pnpm", "dev", "--host", "--port", "80"]
