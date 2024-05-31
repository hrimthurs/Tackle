const HALF_PI = Math.PI / 2
const QUART_PI = Math.PI / 4
const DOUBLE_PI = Math.PI * 2

const _DEG_TO_RAD = Math.PI / 180

/**
 * Converts angle value from degree to radian
 * @param {number} [angleDeg]               Angle degree (default: 0)
 * @returns {number}
 */
function angleDegToRad(angleDeg = 0) {
    return Number(angleDeg) * _DEG_TO_RAD
}

/**
 * Round float number with a given precision
 * @param {number} srcVal                   Float number
 * @param {number} [precision]              Defines the number of decimal points of the result float number (default: 3)
 * @returns {number}
 */
function roundFloat(srcVal, precision = 3) {
    return Number(srcVal.toFixed(precision))
}

/**
 * Calculates the dot product of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function dotProduct2D(ptA, ptB) {
    return (ptA.x * ptB.x) + (ptA.y * ptB.y)
}

/**
 * Calculates the cross product of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function crossProduct2D(ptA, ptB) {
    return (ptA.x * ptB.y) - (ptA.y * ptB.x)
}

/**
 * Calculates the delta between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {{x:number,y:number}}
 */
function delta2D(ptA, ptB) {
    return {
        x: ptA.x - ptB.x,
        y: ptA.y - ptB.y
    }
}

/**
 * Calculates the midpoint between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {{x:number,y:number}}
 */
function midPoint2D(ptA, ptB) {
    return {
        x: (ptA.x + ptB.x) / 2,
        y: (ptA.y + ptB.y) / 2
    }
}

/**
 * Checks is equal coords of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {number} [tolerance]              Tolerance of match coords (default: 0.1)
 * @returns {boolean}
 */
function isEqualCoords2D(ptA, ptB, tolerance = 0.1) {
    const delta = delta2D(ptB, ptA)
    return (Math.abs(delta.x) < tolerance) && (Math.abs(delta.y) < tolerance)
}

/**
 * Calculates the distance between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function dist2D(ptA, ptB) {
    const delta = delta2D(ptB, ptA)
    return Math.sqrt(delta.x ** 2 + delta.y ** 2)
}

/**
 * Calculates the Manhattan distance between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function distManhattan2D(ptA, ptB) {
    const delta = delta2D(ptB, ptA)
    return Math.abs(delta.x) + Math.abs(delta.y)
}

/**
 * Checks is point is nearer 2D ptC to ptA than to ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {boolean}
 */
function isNearerFirstPt2D(ptA, ptB, ptC) {
    return distManhattan2D(ptC, ptA) < distManhattan2D(ptC, ptB)
}

/**
 * Calculation area of polygon 2D
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @param {boolean} [saveSign]              Save the area sign in the result (default: false)
 * @returns {number}
 */
function areaPolygon2D(polyPts, saveSign = false) {
    const area = polyPts.reduce((valArea, ptA, ind) => {
        const ptB = polyPts[(ind + 1) % polyPts.length]
        return valArea + crossProduct2D(ptA, ptB)
    }, 0)

    return saveSign ? area : Math.abs(area)
}

/**
 * Calculation centroid of polygon 2D
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {{x:number,y:number}}
 */
function centroidPolygon2D(polyPts) {
    let area = 0

    const centroid = polyPts.reduce((valCentroid, ptA, ind) => {
        const ptB = polyPts[(ind + 1) % polyPts.length]

        const cross = crossProduct2D(ptA, ptB)
        area += cross

        return {
            x: valCentroid.x + ((ptA.x + ptB.x) * cross),
            y: valCentroid.y + ((ptA.y + ptB.y) * cross)
        }
    }, { x: 0, y: 0 })

    const factor = area * 3

    return {
        x: centroid.x / factor,
        y: centroid.y / factor
    }
}

/**
 * Calculates the point 2D on a line lying at a given distance from ptA
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {number} distance                 Distance from ptA
 * @returns {{x:number,y:number}}
 */
function pointOnLineByLen2D(ptA, ptB, distance) {
    const delta = delta2D(ptB, ptA)
    const factor = distance / (dist2D(ptA, ptB) || 1)

    return {
        x: ptA.x + (delta.x * factor),
        y: ptA.y + (delta.y * factor)
    }
}

/**
 * Calculates the projection of a point 2D ptC onto a straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {{x:number,y:number}}
 */
function projectPointToStraightLine2D(ptA, ptB, ptC) {
    const delta = delta2D(ptB, ptA)
    const deltaPointA = delta2D(ptC, ptA)

    const factor = dotProduct2D(deltaPointA, delta) / dotProduct2D(delta, delta)

    return {
        x: ptA.x + (delta.x * factor),
        y: ptA.y + (delta.y * factor)
    }
}

/**
 * Detect the side on which point ptC is located relative to the straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {number}                        -1, 1, 0 (= located on line)
 */
function sidePointRelativeStraightLine2D(ptA, ptB, ptC) {
    const doubleArea = crossProduct2D(delta2D(ptB, ptA), delta2D(ptC, ptA))
    return Math.sign(doubleArea)
}

/**
 * Checks if point 2D ptC on straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isPointBelongStraightLine2D(ptA, ptB, ptC, tolerance = 1.2) {
    const deltaBA = delta2D(ptB, ptA)
    const deltaCA = delta2D(ptC, ptA)

    const doubleArea = crossProduct2D(deltaBA, deltaCA)
    const lengthAB = Math.sqrt(deltaBA.x ** 2 + deltaBA.y ** 2)

    return Math.abs(doubleArea / lengthAB) <= (tolerance / 2)
}

/**
 * Checks if point 2D ptC on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isPointBelongLineSegment2D(ptA, ptB, ptC, tolerance = 1.2) {
    let res = false

    const deltaBA = delta2D(ptB, ptA)
    const sqLengthAB = (deltaBA.x ** 2) + (deltaBA.y ** 2)

    if (sqLengthAB !== 0) {
        const factorBelong = (((ptC.x - ptA.x) * deltaBA.x) + ((ptC.y - ptA.y) * deltaBA.y)) / sqLengthAB

        if (factorBelong < 0) {
            res = Math.sqrt((ptA.x - ptC.x) ** 2 + (ptA.y - ptC.y) ** 2) <= tolerance
        } else if (factorBelong > 1) {
            res = Math.sqrt((ptB.x - ptC.x) ** 2 + (ptB.y - ptC.y) ** 2) <= tolerance
        } else {
            const factorLocate = (((ptA.y - ptC.y) * deltaBA.x) - ((ptA.x - ptC.x) * deltaBA.y)) / sqLengthAB
            res = Math.abs(factorLocate) * Math.sqrt(sqLengthAB) <= tolerance
        }
    }

    return res
}

/**
 * Checks if some point 2D on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isSomePointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2) {
    return arrPoints.some((pt) => isPointBelongLineSegment2D(ptA, ptB, pt, tolerance))
}

/**
 * Checks if every point 2D on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isEveryPointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2) {
    return arrPoints.every((pt) => isPointBelongLineSegment2D(ptA, ptB, pt, tolerance))
}

/**
 * Checks if point 2D ptA inside in polygon
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
function isPointInsidePolygon2D(ptA, polyPts) {
    let isInside = false

    for (let i = 0, j = polyPts.length - 1; i < polyPts.length; j = i++) {
        const pt1 = polyPts[i]
        const pt2 = polyPts[j]

        const isIntersect =
            ((pt1.y > ptA.y) !== (pt2.y > ptA.y)) &&
            (ptA.x < (pt2.x - pt1.x) * (ptA.y - pt1.y) / (pt2.y - pt1.y) + pt1.x)

        if (isIntersect) isInside = !isInside
    }

    return isInside
}

/**
 * Checks if some point 2D inside in polygon
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
function isSomePointInsidePolygon2D(arrPoints, polyPts) {
    return arrPoints.some((pt) => isPointInsidePolygon2D(pt, polyPts))
}

/**
 * Checks if every point 2D inside in polygon
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
function isEveryPointInsidePolygon2D(arrPoints, polyPts) {
    return arrPoints.every((pt) => isPointInsidePolygon2D(pt, polyPts))
}

/**
 * Checks if parallel of the straight lines ─ptA─────ptB─ and ─ptC─────ptD─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @param {number} [threshold]              Threshold of parallel (default: 0)
 * @returns {boolean}
 */
function isParallelStraightLines2D(ptA, ptB, ptC, ptD, threshold = 0) {
    const denominator = crossProduct2D(delta2D(ptB, ptA), delta2D(ptD, ptC))
    return Math.abs(denominator) < threshold
}

/**
 * Calculates the cross point 2D of the straight lines ─ptA─────ptB─ and ─ptC─────ptD─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {{x:number,y:number}|undefined}
 */
function crossStraightLines2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD)
    if (factor) {
        return _getPointByFactorCross2D(factor, ptA, ptB)
    }
}

/**
 * Calculates the cross point 2D of the lines segments ptA─────ptB and ptC─────ptD
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {{x:number,y:number}|undefined}
 */
function crossLinesSegments2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD)
    if (_isScopeFactorCross2D(factor)) {
        return _getPointByFactorCross2D(factor, ptA, ptB)
    }
}

/**
 * Checks if crossed of the lines segments ptA─────ptB and ptC─────ptD
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {boolean}
 */
function isCrossLinesSegments2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD)
    return _isScopeFactorCross2D(factor) === true
}

function _getFactorCrossLines2D(ptA, ptB, ptC, ptD) {
    let res = null

    if (ptA && ptB && ptC && ptD) {
        const deltaAB = delta2D(ptA, ptB)
        const deltaDC = delta2D(ptD, ptC)

        const cross = crossProduct2D(deltaAB, deltaDC)
        if (cross !== 0) {

            const deltaDB = delta2D(ptD, ptB)
            res = {
                Ua: crossProduct2D(deltaDB, deltaDC) / cross,
                Ub: crossProduct2D(deltaAB, deltaDB) / cross
            }
        }
    }

    return res
}

function _isScopeFactorCross2D(factor) {
    return factor && (factor.Ua >= 0) && (factor.Ua <= 1) && (factor.Ub >= 0) && (factor.Ub <= 1)
}

function _getPointByFactorCross2D(factor, ptA, ptB) {
    return {
        x: (ptA.x * factor.Ua) + (ptB.x * (1 - factor.Ua)),
        y: (ptA.y * factor.Ua) + (ptB.y * (1 - factor.Ua))
    }
}

/**
 * Detect of continuous chains for a set of line segments
 * @param {[{x:number,y:number},{x:number,y:number}][]} arrLines    Array of lines segments
 * @param {boolean} [continuityCoords]                              Changing source coordinates for segments continuity (default: false)
 * @param {number} [tolerance]                                      Tolerance of match coords (default: 0.1)
 * @returns {{inds:number[],closed:boolean}[]}
 */
function chainsLinesSegments2D(arrLines, continuityCoords = false, tolerance = 0.1) {
    let chains = []

    arrLines.forEach((base, indBase) => {
        const isAdded = chains.some((chain) => {
            return chain.some((indLine, ind) => {
                return _joinCoords2D(base, arrLines[indLine], tolerance, (isBefore) => {
                    chain.splice(ind + (isBefore ? 0 : 1), 0, indBase)
                })
            })
        })

        if (!isAdded) chains.push([indBase])
    })

    if (chains.length > 1) {
        chains = _joinChains2D(chains, arrLines, tolerance)
    }

    return chains.map((inds) => {
        if (continuityCoords) {
            inds.forEach((indCurr, ind) => {
                const indNext = ind < inds.length - 1 ? inds[ind + 1] : inds[0]

                const [ptA, ptB] = arrLines[indNext]
                const [ptC] = arrLines[indCurr]

                if (isNearerFirstPt2D(ptB, ptA, ptC)) {
                    arrLines[indNext][0] = ptB
                    arrLines[indNext][1] = ptA
                }
            })
        }

        const { first, last } = _getChainEnds(arrLines, inds)
        const closed = (inds.length > 2) && _joinCoords2D(first, last, tolerance)

        return { inds, closed }
    })
}

function _joinChains2D(chains, arrLines, tolerance) {
    const joinedChains = chains.filter((base, indBase) => {

        let isJoined = false
        const endsBase = _getChainEnds(arrLines, base)

        for (let indCheck = indBase + 1; indCheck < chains.length; indCheck++) {
            const check = chains[indCheck]
            const endsCheck = _getChainEnds(arrLines, check)

            isJoined =
                _joinCoords2D(endsBase.first, endsCheck.last, tolerance, () => check.push(...base)) ||
                _joinCoords2D(endsBase.last, endsCheck.first, tolerance, () => check.unshift(...base)) ||
                _joinCoords2D(endsBase.last, endsCheck.last, tolerance, () => check.push(...base.reverse())) ||
                _joinCoords2D(endsBase.first, endsCheck.first, tolerance, () => check.unshift(...base.reverse()))

            if (isJoined) break
        }

        return !isJoined
    })

    return joinedChains
}

function _joinCoords2D(pointsBase, pointsCheck, tolerance, cbAction = (isBefore) => {}) {
    let res = true

    const [basePtA, basePtB] = pointsBase
    const [checkPtA, checkPtB] = pointsCheck

    if (isEqualCoords2D(checkPtB, basePtA, tolerance) || isEqualCoords2D(checkPtA, basePtA, tolerance)) {
        cbAction(true)
    } else if (isEqualCoords2D(checkPtA, basePtB, tolerance) || isEqualCoords2D(checkPtB, basePtB, tolerance)) {
        cbAction(false)
    } else {
        res = false
    }

    return res
}

function _getChainEnds(coords, chain) {
    return {
        first: coords[chain[0]],
        last: coords[chain[chain.length - 1]]
    }
}

export default { HALF_PI, QUART_PI, DOUBLE_PI, angleDegToRad, roundFloat, dotProduct2D, crossProduct2D, delta2D, midPoint2D, isEqualCoords2D, dist2D, distManhattan2D, isNearerFirstPt2D, areaPolygon2D, centroidPolygon2D, pointOnLineByLen2D, projectPointToStraightLine2D, sidePointRelativeStraightLine2D, isPointBelongStraightLine2D, isPointBelongLineSegment2D, isSomePointBelongLineSegment2D, isEveryPointBelongLineSegment2D, isPointInsidePolygon2D, isSomePointInsidePolygon2D, isEveryPointInsidePolygon2D, isParallelStraightLines2D, crossStraightLines2D, crossLinesSegments2D, isCrossLinesSegments2D, chainsLinesSegments2D }