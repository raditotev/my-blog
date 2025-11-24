---
title: Fine-Tuning Google's Gemma-3-4B-IT Model with MLX_LM and Preparing It for Ollama
date: 2025-11-21
description: The article is a blog post that offers a detailed, step-by-step guide to fine-tuning Google's Gemma-3-4B-IT model using MLX_LM on Apple Silicon. It covers downloading the base model from Hugging Face, training with LoRA adapters and a custom dataset, fusing the adapters, copying the tokenizer, converting the model to GGUF format for compatibility with Ollama, and setting up a Modelfile for deployment.
categories:
  - ai
  - macos
---

# Fine-Tuning Google's Gemma-3-4B-IT Model with MLX_LM and Preparing It for Ollama

Fine-tuning large language models (LLMs) has become increasingly accessible, thanks to tools like MLX_LM, which is optimized for Apple Silicon. In this blog post, I'll walk you through the process of fine-tuning the base Google Gemma-3-4B-IT model using a custom dataset, fusing the adapters, and converting the result to GGUF format for use with Ollama. This guide is based on my personal notes from a recent experiment, and it's aimed at anyone looking to customize an LLM for specific tasks.

We'll cover the key steps: downloading the base model, fine-tuning, fusing, handling the tokenizer, conversion to GGUF, and setting up a Modelfile for Ollama. Assumptions include owning a Mac M-series, having MLX_LM installed, access to Hugging Face models, and Llama.cpp for the conversion step. Let's dive in!

## Step 1: Downloading the Base Model from Hugging Face

Before you can fine-tune the model, you need to download the base Google Gemma-3-4B-IT model from Hugging Face. Note that Gemma models are gated, meaning you must accept the license terms on the Hugging Face model page (https://huggingface.co/google/gemma-3-4b-it) and have an approved account. Once accepted, you'll need a Hugging Face access token for authenticated downloads.

First, ensure you have Homebrew installed on your macOS system (if not, install it from https://brew.sh/). Then, install the Hugging Face CLI using Homebrew:

```bash
brew install huggingface-cli
```

To get your credentials for logging in:

1. Go to https://huggingface.co/ and sign up for a free account if you don't have one.
2. Navigate to your profile settings by clicking on your avatar in the top right and selecting "Settings."
3. In the left sidebar, click on "Access Tokens."
4. Click "New token" to generate a new access token. Give it a name, select the appropriate scopes (e.g., "read" for downloading models), and copy the generated token. If you only want to download the model select "read" but if you want later on to upload you fine-tuned model to huggingface select the "write" option.

Then, log in to Hugging Face using the CLI:

```bash
huggingface-cli login
```

Paste your access token when prompted.

Now, download the model:

```bash
huggingface-cli download google/gemma-3-4b-it --local-dir gemma-3-4b-it
```

This saves the model files to a local directory named `gemma-3-4b-it`. Alternatively, if you skip this step, MLX_LM will automatically download the model to your cache (`~/.cache/huggingface/hub`) when you run the fine-tuning command in the next step. However, explicit downloading ensures everything is ready and allows you to verify the files.

# Step 2: Preparing the data set

In order to fine-tune the model you'll need a dataset. There are three different types of data formats mlx [supports](https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/LORA.md#Data) and after testing each one of them I've found I get the best results with the `completion` format, e.g.:

```
{"prompt": "What is the capital of France?", "completion": "Paris."}
```

To get any meaningful result you'll need 50 or more of those in a `train.jsonl` file. It's important to notice the train file is [JSONL](https://jsonlines.org/). This is different from json. In this format every object is on a new line and there are no comma separators. You'll need a `valid.jsonl` file as well were you'll have the same entries like the `train.jsonl`. The rule of thumb is to have 80% of the dataset in train.jsonl and 20% in `valid.jsonl`.

## Step 3: Fine-Tuning the Model

With the base model available, proceed to fine-tune it using your dataset. In this example, we're using the Google Gemma-3-4B-IT as the base, with training data located in a `./data` folder. MLX_LM's LoRA (Low-Rank Adaptation) method makes this efficient without retraining the entire model.

Run the following command:

```bash
mlx_lm.lora --model google/gemma-3-4b-it --train --data ./data --batch-size 4 --iters 100
```

- `--model`: Specifies the base model from Hugging Face (or your local path if downloaded manually).
- `--train`: Enables training mode.
- `--data`: Path to your dataset folder (e.g., JSONL files with prompt-completion pairs).
- `--batch-size 4`: Keeps memory usage manageable.
- `--iters 100`: Number of training iterations—adjust based on your dataset size and convergence.

This will generate adapter files in an `adapters` directory. Monitor the output for loss metrics to gauge training progress.

## Step 4: Fusing the Adapters with the Base Model

Once fine-tuning is complete, fuse the adapters back into the base model to create a single, unified fine-tuned model.

Use this command:

```bash
mlx_lm.fuse --model google/gemma-3-4b-it --save-path gemma-3-4b-it-ft --adapter-path adapters --de-quantize
```

- `--save-path`: Directory where the fused model will be saved (e.g., `gemma-3-4b-it-ft`).
- `--adapter-path`: Path to the adapters from Step 2.
- `--de-quantize`: Ensures the model is in full precision (useful for further conversions).

This step combines the learned adaptations with the original weights, resulting in a ready-to-use fine-tuned model.

## Step 5: Copying the Tokenizer

> [!NOTE]
> I didn't have to do this step when fine-tuning Llama-3.2-3B-Instruct

Unlike some frameworks (e.g., Ollama's built-in fine-tuning), MLX_LM doesn't automatically include the tokenizer in the fused model. You'll need to copy it manually from the base model's cache.

First, locate the tokenizer in your Hugging Face cache (replace `<commit hash>` with the actual hash from your local cache):

```bash
cp ~/.cache/huggingface/hub/models--google--gemma-3-4b-it/snapshots/<commit hash>/tokenizer.model gemma-3-4b-it-ft
```

This ensures the fused model has the correct tokenizer for text processing.

## Step 6: Converting to GGUF Format

To use the model with Ollama, convert it to GGUF (a format supported by Llama.cpp and Ollama). This requires the Llama.cpp repository cloned and set up.

Navigate to the Llama.cpp directory and run:

```bash
python convert_hf_to_gguf.py path-to-your-project/gemma-3-4b-it-ft --outfile ../gguf/<name your model>.gguf --outtype f16
```

- Path to fused model: Adjust based on your directory structure (e.g., `path-to-your-project/gemma-3-4b-it-ft`).
- `--outfile`: Path to save the GGUF file.
- `--outtype f16`: Uses float16 precision for a balance of size and performance.

This conversion makes the model compatible with Ollama's ecosystem.

## Step 7: Creating a Modelfile and Running in Ollama

Finally, set up a Modelfile to define how Ollama should load and interact with your model. Create a file named `Modelfile` with the following content:

```
FROM ./gguf/<name of you model>.gguf

TEMPLATE """{{ .System }}
{{ .Prompt }}
{{ .Response }}"""

PARAMETER num_ctx 2048
PARAMETER temperature 0.7
```

- `FROM`: Points to your GGUF file.
- `TEMPLATE`: Defines the chat format (customize based on your needs).
- `PARAMETER`: Sets context window and generation parameters.

To create and run the model in Ollama:

```bash
ollama create my-fine-tuned-gemma -f Modelfile
ollama run my-fine-tuned-gemma
```

Now you can interact with your fine-tuned model via Ollama's UI, CLI or API!

## Conclusion

Fine-tuning with MLX_LM is a powerful way to adapt models like Gemma-3-4B-IT to your data, and integrating with Ollama opens up easy deployment options. This process took me just a few hours on an M3 Mac, but results will vary based on hardware and dataset. Experiment with hyperparameters, and always evaluate for biases or hallucinations post-fine-tuning.

If you run into issues, check the MLX_LM docs or Llama.cpp GitHub. Happy fine-tuning! 🚀

## Resources

[Llama.cpp](https://github.com/ggml-org/llama.cpp)  
[MLX-LM](https://github.com/ml-explore/mlx-lm)  
[HuggingFace](https://huggingface.co/)  
[JSONL](https://jsonlines.org/)
