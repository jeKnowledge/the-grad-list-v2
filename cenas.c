#include <stdio.h>
#include <stdlib.h>

struct vetor_t {
  size_t size;
  int *data;
}

int Prod(vetor_t *ptr) {
  *(ptr->data) = *(ptr->data)+3;
}

int main(int argc, char const *argv[]) {
  vetor_t *vec;
  vec = (vetor_t *) malloc(sizeof(vetor_t));
  vec->size = 2;
  vec->data[0] = 1;
  vec->data[1] = 2;
  Prod(vec);
  printf("%s\n",*((vec->data)+1) );
  return 0;
}
