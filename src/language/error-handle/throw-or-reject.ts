export async function someThrowInAsyncLogic() {
  throw Error('Error occurred!');
}

export async function main() {
  try {
    await someThrowInAsyncLogic(); // I can catch
    // someThrowInAsyncLogic(); // BUT I CAN NOT CATCH
  } catch (error) {
    console.log('catch', error instanceof Error, (error as Error).message);
  }
}

main().then();
