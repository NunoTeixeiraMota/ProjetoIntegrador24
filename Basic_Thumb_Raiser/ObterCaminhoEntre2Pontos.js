function criarCaminho(matriz, pontoInicial, pontoFinal) {
    const [x1, y1] = pontoInicial;
    const [x2, y2] = pontoFinal;

    if (
        x1 < 0 || x1 >= matriz.length ||
        y1 < 0 || y1 >= matriz[0].length ||
        x2 < 0 || x2 >= matriz.length ||
        y2 < 0 || y2 >= matriz[0].length
    ) {
        return null; // Fora do limite do mapa
    }

    if (JSON.stringify(pontoInicial) === JSON.stringify(pontoFinal)) {
        return null; // ponto inicial == final
    }

    if (![0, 4, 5].includes(matriz[x1][y1]) || ![0, 4, 5].includes(matriz[x2][y2])) {
        return null; // nao pode começar em cima de uma parede
    }

    const caminho = [];
    let atual = pontoInicial;

    while (!compararPontos(atual, pontoFinal)) {
        const vizinhos = [];

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const novoX = atual[0] + dx;
                const novoY = atual[1] + dy;

                if (
                    novoX >= 0 && novoX < matriz.length &&
                    novoY >= 0 && novoY < matriz[0].length &&
                    [0, 4, 5].includes(matriz[novoX][novoY]) && //so pode passar por 0 = n tem nada e 4 ou 5 = porta
                    (dx === 0 || dy === 0)
                ) {
                    vizinhos.push([novoX, novoY]);
                }
            }
        }

        if (vizinhos.length === 0) {
            return null; //não existe caminho possível
        }

        const proximo = vizinhos[0];
        caminho.push(obterDirecao(atual, proximo));
        atual = proximo;
    }

    return caminho;
}

function compararPontos(ponto1, ponto2) {
    return ponto1[0] === ponto2[0] && ponto1[1] === ponto2[1];
}

function obterDirecao(pontoAtual, proximoPonto) {
    const [xAtual, yAtual] = pontoAtual;
    const [xProximo, yProximo] = proximoPonto;

    if (xProximo < xAtual) {
        return 0; // Cima
    } else if (xProximo > xAtual) {
        return 1; // Baixo
    } else if (yProximo < yAtual) {
        return 2; // Esquerda
    } else if (yProximo > yAtual) {
        return 3; // Direita
    }

    return -1;
}