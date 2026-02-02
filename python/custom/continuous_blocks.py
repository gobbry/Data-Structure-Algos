from dataclasses import dataclass
from typing import Optional


@dataclass
class BlockSerie:
    start_block: Optional[int]
    end_block: Optional[int]
    num_points: int


def validate_series(series: list["BlockSerie"]) -> bool:
    """
    Question: Given an array of sorted aggregated data points of blocks, find if there are missing gaps between these data points.
    Each data point is an aggregated data point containing a bunch of blocks starting from start_block to end_block.

    Note that individual data points can be null or empty. This does not mean there's a gap, rather, you will need to compare with the previous non-null one.
    If there are no non-null blocks to compare, you may skip and consider the data point as validated

    For example:
    The following passes validation
    [
    BlockSerie(start_block=1,end_block=10,num_points=10),
    BlockSerie(start_block=None,end_block=None,num_points=0),
    BlockSerie(start_block=13,end_block=14,num_points=3),
    ]

    [
    BlockSerie(start_block=None,end_block=None,num_points=0),
    BlockSerie(start_block=None,end_block=None,num_points=0),
    BlockSerie(start_block=13,end_block=14,num_points=3),
    ]

    The following fails validation:
    [
    BlockSerie(start_block=1,end_block=10,num_points=10),
    BlockSerie(start_block=None,end_block=None,num_points=0),
    BlockSerie(start_block=9,end_block=14,num_points=3),
    ]

    Curveball: What if the series is not sorted anymore, is there still an O(n) solution?
    """
    if len(series) <= 1:
        return True

    min_block_num = None
    max_block_num = None
    covered_blocks = 0
    has_valid = False

    for serie in series:
        if serie.start_block is None or serie.end_block is None:
            continue

        has_valid = True
        if min_block_num is None or serie.start_block < min_block_num:
            min_block_num = serie.start_block
        if max_block_num is None or serie.end_block > max_block_num:
            max_block_num = serie.end_block

        covered_blocks += serie.num_points

    if not has_valid:
        return True  # every single data point is a null data point

    required = max_block_num - min_block_num + 1
    if covered_blocks != required:
        return False

    # Algo for sorted:
    # last_valid = None
    # for current in series:
    #     if current.start_block is None or current.end_block is None:
    #         continue

    #     if last_valid is not None:
    #         is_discontinuous = last_valid.end_block + 1 != current.start_block
    #         if is_discontinuous:
    #             raise ValueError(
    #                 f"data is not valid, last non-null block {last_valid} does not precede {current}"
    #             )

    #     last_valid = current
