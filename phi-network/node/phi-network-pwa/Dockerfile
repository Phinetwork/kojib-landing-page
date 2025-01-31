# syntax=docker/dockerfile:1

### ----- Stage 1: Builder -------------------------------------
	FROM rust:1.76-slim-bullseye AS builder

	# Install build dependencies
	RUN apt-get update && apt-get install -y \
		cmake \
		pkg-config \
		libssl-dev \
		git \
		clang \
		curl \
		libclang-dev \
		protobuf-compiler \
	  && rm -rf /var/lib/apt/lists/*
	
	# Set the working directory
	WORKDIR /app
	
	# Copy the root Cargo.toml and Cargo.lock
	COPY Cargo.toml Cargo.lock ./
	
	# Copy Cargo.toml for each workspace member
	COPY node/Cargo.toml ./node/
	COPY runtime/Cargo.toml ./runtime/
	COPY pallets/template/Cargo.toml ./pallets/template/
	# Add COPY instructions for other workspace members as needed
	# Example:
	# COPY pallets/another-pallet/Cargo.toml ./pallets/another-pallet/
	
	# Create dummy src directories with dummy main.rs or lib.rs for each workspace member
	RUN mkdir -p node/src && echo "fn main() {}" > node/src/main.rs
	RUN mkdir -p runtime/src && echo "fn main() {}" > runtime/src/lib.rs
	RUN mkdir -p pallets/template/src && echo "fn main() {}" > pallets/template/src/lib.rs
	# Repeat for other workspace members if necessary
	# Example:
	# RUN mkdir -p pallets/another-pallet/src && echo "fn main() {}" > pallets/another-pallet/src/lib.rs
	
	# Install the wasm32-unknown-unknown target
	RUN rustup target add wasm32-unknown-unknown --toolchain 1.76.0
	
	# Pre-fetch dependencies
	RUN cargo fetch
	
	# Now copy the entire source code
	COPY . .
	
	# Build the project in release mode using all available CPU cores
	RUN cargo build --release --jobs $(nproc)
	
	### ----- Stage 2: Runner --------------------------------------
	FROM debian:bullseye-slim
	
	# Install runtime dependencies
	RUN apt-get update && apt-get install -y \
		libssl-dev \
		ca-certificates \
	  && rm -rf /var/lib/apt/lists/*
	
	# Create a non-root user for security
	RUN useradd -m -u 1000 -U -s /bin/bash substrate
	USER substrate
	
	# Set the working directory
	WORKDIR /home/substrate
	
	# Copy the compiled binary from the builder stage
	COPY --from=builder /app/target/release/solochain-template-node /usr/local/bin/solochain-template-node
	
	# Expose necessary ports (adjust if your node uses different ports)
	EXPOSE 30333 9933 9944
	
	# Set the default command to run the node
	CMD ["solochain-template-node", "--dev", "--rpc-external", "--validator"]
	